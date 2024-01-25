// // const cloudinary = require('cloudinary').v2;
// import Cloudinary from 'cloudinary';

// const cloudinary = Cloudinary.v2;

// cloudinary.config({
//   cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// export function uploadImage(imageUploaded) {
//     return new Promise((resolve, reject) => {
//         cloudinary.uploader.upload(
//             imageUploaded,
//             {},
//             (err, res) => {
//                 if (err) return reject(err)
//                 return resolve(res)
//             }
//         )
//     })
// }
