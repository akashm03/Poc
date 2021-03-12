import express from 'express';
import service from '../contoller/ServiceSchedularController';
const router = express.Router();

//@ts-ignore
router.get('/jobstatus',service.findAllPromotionDetails);
//@ts-ignore
router.get('/userId',service.findAllUserId);
//@ts-ignore
router.post('/createUser',service.createUserData);
//@ts-ignore
router.get('/orderBy',service.findOrderByStartTime);
//@ts-ignore
router.post('/createPromotion',service.createPromotionData);
//@ts-ignore
router.post('/targetOffer',service.createTargetedOffer);

export default router;