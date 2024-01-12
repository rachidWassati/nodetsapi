import multer from "multer";

const uploadImage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'images')
    },
    filename: function(req, file, cb) {
        cb(null, `${new Date().toISOString()}_${file.originalname}`)
    }
})

const imagesMiddleware = multer({storage: uploadImage}).array('images', 10)

export {imagesMiddleware}