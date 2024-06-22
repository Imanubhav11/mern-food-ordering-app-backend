import  express  from "express";
import { param } from "express-validator";
import RestaurantController from "../controller/RestaurantController";


const router = express.Router();

router.get(
    "/:restaurantId",
    param("restaurantId")
      .isString()
      .trim()
      .notEmpty()
      .withMessage("RestaurantId paramenter must be a valid string"),
    RestaurantController.getRestaurant
  );

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