use bevy_ecs::{
    prelude::Component,
    query::{Changed, Or},
    system::Query,
};

#[derive(Component, Debug)]
pub struct Transform {
    pub position: glam::Vec3,
    pub scale: glam::Vec3,
    pub rotation: glam::Vec3,
    pub matrix: glam::Mat4,
}

impl Default for Transform {
    fn default() -> Self {
        Self {
            position: Default::default(),
            scale: glam::Vec3::ONE,
            rotation: glam::Vec3::ZERO,
            matrix: glam::Mat4::IDENTITY,
        }
    }
}

pub fn update_transform_sys(mut query: Query<&mut Transform, Changed<Transform>>) {
    for (mut transform) in &mut query {
        let quat = glam::Quat::from_rotation_x(transform.rotation.x)
            * glam::Quat::from_rotation_y(transform.rotation.y)
            * glam::Quat::from_rotation_z(transform.rotation.z);

        let mat =
            glam::Mat4::from_scale_rotation_translation(transform.scale, quat, transform.position);

        // log::warn!("tra :{:?}", transform);

        transform.matrix = mat;
    }
}
