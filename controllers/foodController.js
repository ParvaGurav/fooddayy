import fs from "fs";

import foodModel from "../models/foodModel.js";

// add food item
const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });
  try {
    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.josn({ success: false, message: "Error" });
  }
};

// list all food  items
const getAllFoodList = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// remove food items from database
const removeFoodItem = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    console.log(req.body.id);
    
    // delete image from folder
    fs.unlink(`uploads/${food.image}`, () => {});
    // find the food item and delete
    await foodModel.findByIdAndDelete(req.body.id);

    res.json({ success: true, message: "Food removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { addFood, getAllFoodList, removeFoodItem };
