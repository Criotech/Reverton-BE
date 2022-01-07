import multer from 'multer';
import path from 'path';

// FILE CHECK
function checkFileType(type:any) {
  return (_: any, file:any, cb:any) => {
    // Allowed ext
    let filetypes;
    if (type === 'pdf') {
      filetypes = /pdf/;
    } else if (type === 'image') {
      filetypes = /jpeg|jpg|png|gif/;
    }

    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    // Get ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb(`Error Occured: Upload ${type.toUpperCase()} Only!`);
  };
}
// Multer execute
const Upload = multer({ storage: multer.diskStorage({}), fileFilter: checkFileType('image') });

export default Upload;
