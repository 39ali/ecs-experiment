use std::{collections::HashMap, sync::RwLock};

use bevy_ecs::prelude::Component;

pub type Img = image::ImageBuffer<image::Rgba<u8>, Vec<u8>>;

lazy_static! {
   pub  static ref IMGS: RwLock<HashMap<String, Img>> = RwLock::new(HashMap::new());
    // pub static ref RES_TO_INDEX: RwLock<HashMap<u32, String>> = RwLock::new(HashMap::new());
}

#[derive(Component, Debug, Clone)]
pub struct Texture {
    pub id: String,
}

pub async fn add_img(url: &str) -> String {
    use futures::channel::oneshot;
    let (sender, receiver) = oneshot::channel();

    let request = ehttp::Request::get(url.clone());
    ehttp::fetch(request, move |result: ehttp::Result<ehttp::Response>| {
        let res = result.expect("failed to download image ");
        let k = res.url.clone().to_string();
        let request = ehttp::Request::get(res.url);
        ehttp::fetch(request, move |result: ehttp::Result<ehttp::Response>| {
            let res = result.expect("failed to download image");
            let image = image::load_from_memory(&res.bytes).unwrap();
            let rgba = image.to_rgba8();

            IMGS.write().unwrap().insert(k.clone(), rgba);

            sender.send(k).unwrap();
        });
    });
    let id = receiver.await.unwrap();
    id
}

pub async fn fetch_imgs(count: u32) -> Vec<Texture> {
    log::info!("fetching textures..");
    let mut v = Vec::with_capacity(count as usize);
    for i in 0..count {
        let id = add_img("https://picsum.photos/512/512").await;
        let tex = Texture { id };
        v.push(tex);
    }
    log::info!("fetching textures done ");
    v
}
