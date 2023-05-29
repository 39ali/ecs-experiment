use std::{collections::HashMap, fs, path::Path, sync::RwLock};

use bevy_ecs::prelude::Component;
use instant::Instant;

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

            let file = format!("./images/image{:?}.jpg", IMGS.read().unwrap().len());
            image.save(&file).unwrap();

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
        let id = add_img("https://picsum.photos/1920/1080").await;
        let tex = Texture { id };
        v.push(tex);
    }
    log::info!("fetching textures done ");
    v
}

pub async fn load_imgs(count: u32) -> Vec<Texture> {
    log::info!("loading textures..");

    let mut v = Vec::with_capacity(count as usize);
    for i in 0..count {
        use futures::channel::oneshot;
        let (sender, receiver) = oneshot::channel();

        let url = format!("http://localhost:8080/images/image{i:?}.jpg");
        let request = ehttp::Request::get(url.clone());
        ehttp::fetch(request, move |result: ehttp::Result<ehttp::Response>| {
            let res = result.expect("failed to download image");
            let t = Instant::now();
            let image = image::load_from_memory(&res.bytes).unwrap();

            let rgba = image.to_rgba8();

            IMGS.write().unwrap().insert(url.clone(), rgba);

            let total = t.elapsed().as_secs_f32();
            log::info!("loading :{:? }sec", total);

            sender.send(url).unwrap();
        });
        let id = receiver.await.unwrap();
        let tex = Texture { id };
        v.push(tex);
    }
    log::info!("loading textures done ");
    v
}
