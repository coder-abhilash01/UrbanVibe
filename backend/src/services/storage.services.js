const ImageKit = require('imagekit');

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY ,
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

const uploadFile = async(file, fileName)=>{
    const response = await imageKit.upload({
  file: file,
  fileName: fileName,
  folder: "E-commerce"
});

return response ;}

module.exports = uploadFile