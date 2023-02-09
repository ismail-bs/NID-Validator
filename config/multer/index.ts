const { MULTER_FILE_DESTINATION, MULTER_FILE_SIZE, MULTER_FILE_EXTENSIONS } =
  process.env;

export const multerConfig = {
  dest: MULTER_FILE_DESTINATION || 'src/public/assets',
  maxFileSize: Number(MULTER_FILE_SIZE) || 3 * 1024 * 1024, // 3 MB
  mimeTypes: MULTER_FILE_EXTENSIONS || [
    'image/png',
    'image/jpeg',
    'image/svg+xml',
    'image/jpg',
  ],
};

export const multerOptions = {
  // File size limits
  limits: {
    fileSize: +multerConfig.maxFileSize,
  },
  // Check the mimetypes of the file
  fileFilter: (req: any, file: Express.Multer.File, cb: any) => {
    req.fileValidationError = false;
    if (file && multerConfig.mimeTypes.includes(file.mimetype)) {
      cb(null, true, req.fileValidationError);
    } else {
      req.fileValidationError = true;
      return cb(null, false, req.fileValidationError);
    }
  },
};
