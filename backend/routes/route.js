import express from 'express';
import authenticated from '../Middlewares/middleware.js';
import {generateArticle,generateImage,generateTitle, removeBackground, removeObject, reviewResume}  from '../controllers/aicontroller.js';
import {getUserCreations,getPublishedCreations,toggleLike} from '../controllers/usercontroller.js';
import upload from '../config/multer.js';
const router = express.Router();

router.post('/generateArticle',authenticated,generateArticle);
router.post('/generatetitle',authenticated,generateTitle);
router.post('/generateImage',authenticated,generateImage);
router.post('/removeBackground',authenticated,upload.single('image'),removeBackground);
router.post('/removeObject',authenticated,upload.single('image'),removeObject);
router.post('/reviewResume',authenticated,upload.single('resume'),reviewResume);
router.get('/getuserCreations',authenticated,getUserCreations);
router.get('/getpublishedCreations',authenticated,getPublishedCreations);
router.get('/toggleLike/:id',authenticated,toggleLike);


export default router;