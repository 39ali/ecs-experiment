

struct GlobalData{
    cam_transform: mat4x4<f32>, 
}; 
struct GpuSpriteData {
    transform: mat4x4<f32> , //0
    // sprite_size: vec4<f32> ,
    // pad0:f32,
    // pad1:f32,
    // uv_offset: [f32; 2],      //16
    // uv_scale: [f32; 2],       //24
    // texture_index: u32,       //32
} //36

struct VertexOut {
    @builtin(position) position: vec4<f32>,
    @location(0) uv: vec2<f32>,
};


@group(0) @binding(0)
var<uniform> uniforms: GlobalData;

// BUG: webgl `max_*_buffer_binding_size` limit 16384 even thou adapter returns 65536.
@group(0) @binding(1)
var<uniform> sprites_data: array<GpuSpriteData,128>;

@group(0) @binding(2)
var texture_array: texture_2d<f32>;

@group(0) @binding(3)
var sampler_default: sampler;

//BUG: in naga  https://github.com/gfx-rs/naga/issues/1829
// const TRI_VERTICES = array(
//   vec3(-1.,-1., 0.),
//   vec3(-1., 1., 0.),
//   vec3(1., 1., 0.),

//   vec3(1., 1., 0.),
//   vec3(1., -1., 0.),
//   vec3(-1., -1., 0.),
// );
// for now we use this function instead 
fn TRI_VERTICES( v_idx: u32)-> vec3f {

switch v_idx {
  case 0u: {   
   return vec3(-1.,-1., 0.);
  }
  case 1u {    
   return vec3(-1., 1., 0.);
  }
  case 2u { 
  return vec3(1., 1., 0.); 
  }
  case 3u {   
   return vec3(1., 1., 0.);
  }
  case 4u {
    return vec3(1., -1., 0.);
  }
   case 5u {
    return vec3(-1., -1., 0.);
  }
 default {
    return vec3(-1.,-1., 0.);
 }
}

} 

fn scale_mat(size:vec2<f32>) -> mat4x4<f32>{
    var a: mat4x4<f32>;
    a = mat4x4<f32>(vec4<f32>(size.x, 0.0, 0.0, 0.0), vec4<f32>(0.0, size.y, 0.0, 0.0), vec4<f32>(0.0, 0.0, 1.0, 0.0), vec4<f32>(0.0, 0.0, 0.0, 1.0));
    return a;        
}

@vertex
fn vs_main(
 @builtin(vertex_index) v_idx: u32 ,
 @builtin(instance_index) i_idx_: u32,
 @location(0) position: vec2<f32>,
 @location(1) uv: vec2<f32>,   
) -> VertexOut {
    var i_idx =i32(i_idx_); 
    var out: VertexOut;
    var sprite = sprites_data[i_idx]; 

  
    // Chromium BUG (webgl)  : vertex buffer needs to be set and be used by the shader or the instance_index won't return the correct values .
    //TRI_VERTICES(v_idx)
    out.position =vec4<f32>(position,0.0, 1.0f);
    out.position =uniforms.cam_transform* sprite.transform* out.position;

    out.uv= vec2(uv.x ,1.0- uv.y);
    return out;
}

@fragment
fn fs_main(in: VertexOut) -> @location(0) vec4<f32> {

var outval = textureSample(
            texture_array,
            sampler_default,
            in.uv
        ).rgb;
    // return vec4<f32>(in.uv,0.0, 1.0);
    return vec4<f32>(outval, 1.0);
}
