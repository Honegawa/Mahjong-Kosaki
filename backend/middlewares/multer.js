import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return callback(new Error("Only image files are allowed"), false);
  }
  callback(null, true);
};

export const configurationStorage = () => multer({ storage, fileFilter });
