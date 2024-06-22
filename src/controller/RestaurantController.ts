import { Request, Response } from "express";
import Restaurant from "../models/restaurant";

const searchRestaurant = async (req: Request, res: Response) => {
    try {
      const city = req.params.city;
  
      // in here we just basically type cast the data types into string format using query as these datas can be changed or altered
      const searchQuery = (req.query.searchQuery as string) || "";
      const selectedCuisines = (req.query.selectedCuisines as string) || "";
      const sortOption = (req.query.sortOption as string) || "lastUpdated";
      const page = parseInt(req.query.page as string) || 1;
  
      //the query type in here is any as it will be very complicated to handle any particular type of query if we define 
      let query: any = {};
  
      //find all the restaurants in the given city
      query["city"] = new RegExp(city, "i");
       // cityCheck will be provided with the number of queries that have been matched from the Restaurant database
      const cityCheck = await Restaurant.countDocuments(query);
      if (cityCheck === 0) {
        return res.status(404).json({
          data: [],
          pagination: {
            total: 0,
            page: 1,
            pages: 1,
          },
        });
      }
  
      if (selectedCuisines) {
        //URL = selectedCuisines=italian,burgers,chinese
        // [ italian, burgers, chinese ]
        const cuisinesArray = selectedCuisines
          .split(",")
          .map((cuisine) => new RegExp(cuisine, "i"));
        // find all the restaurants that has all the cuisines passed in the cuisinesArray
        query["cuisines"] = { $all: cuisinesArray };
      }
  
      if (searchQuery) {
        const searchRegex = new RegExp(searchQuery, "i");
        query["$or"] = [
          { restaurantName: searchRegex },
          // the $in ensures that any item from the cuisinesArray if it matches it will return that restaurant
          { cuisines: { $in: [searchRegex] } },
        ];
      }
  
      const pageSize = 10;
      const skip = (page - 1) * pageSize;
  
      // sortOption = "lastUpdated"
      const restaurants = await Restaurant.find(query)
        .sort({ [sortOption]: 1 })
        .skip(skip)
        .limit(pageSize)
        .lean();
  
      const total = await Restaurant.countDocuments(query);
  
      const response = {
        data: restaurants,
        pagination: {
          total,
          page,
          pages: Math.ceil(total / pageSize),
        },
      };
  
      res.json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };

  const getRestaurant = async (req: Request, res: Response) => {
    try {
      const restaurantId = req.params.restaurantId;
  
      const restaurant = await Restaurant.findById(restaurantId);
      if (!restaurant) {
        return res.status(404).json({ message: "restaurant not found" });
      }
  
      res.json(restaurant);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    }
  };
  

export default{
    getRestaurant,
    searchRestaurant,
}