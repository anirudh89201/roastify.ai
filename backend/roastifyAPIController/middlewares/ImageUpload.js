import multer from "multer";
const storage = multer.memoryStorage();
const ImageFilter = (req,file,cb) => {
    const allowedMimeTypes = ['image/jpeg','image/png','image/webp'];
    if(allowedMimeTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error('Only Image files are allowed'),false);
    }
};
export const uploadedFile = multer({
    storage:storage,
    fileFilter:ImageFilter,
    limits:{fileSize:5*1024*1024}
})
