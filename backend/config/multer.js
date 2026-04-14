import multer from 'multer';

const storage = multer.diskStorage({});
const upload = multer({ storage });

const resumeUpload = multer({ storage: multer.memoryStorage() });

export default upload;
export { resumeUpload };