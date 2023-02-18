import multer from 'multer';
import path from 'path';
import { __dirname } from '../utils/constants.js';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public'));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    }
})

export default multer({ 
    storage: storage, 
    limits: {
        fileSize: 10485760
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
          cb(null, true);
        } 
        else {
          cb(null, false);
          return cb(new Error('Only .png, .jpg format allowed!'));
        }
    }
})