import  express  from "express";
import { param } from "express-validator";
import RestaurantController from "../controller/RestaurantController";


const router = express.Router();

// /api/restaurant/search/bhubaneswar
router.get('/search/:city', 
    param("city")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("city paramter must be a valid string"),
    RestaurantController.searchRestaurant
);

export default router;