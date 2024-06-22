import express from 'express';
import { jwtCheck, jwtParse } from '../middleware/auth';
import OrderController from '../controller/OrderController';

const router = express.Router();

//as we are creating the checkout functionality so we use the post request
router.post(
    "/checkout/create-checkout-session",
    jwtCheck,
    jwtParse,
    OrderController.createCheckoutSession
);

router.post("/checkout/webhook", OrderController.stripeWebHookHandler);


export default router;
