import cloudinary from '../config/cloudinary';
import logger from '../config/logger';

// eslint-disable-next-line camelcase
// eslint-disable-next-line consistent-return
const UploadFile = async (file: string) => {
  try {
    // eslint-disable-next-line camelcase
    const as = await cloudinary.v2.uploader.upload(file, {
      resource_type: 'auto',
      folder: 'startupia'
    });
    return { public_id: as.public_id, url: as.url };
  } catch (error) {
    logger.info('error occured', error);
  }
};

const DeleteFile = async (pictureId: string) => {
  try {
    await cloudinary.v2.uploader.destroy(pictureId);
    return;
  } catch (error) {
    logger.info('error occured', error);
  }
};

export {
  UploadFile,
  DeleteFile
};
