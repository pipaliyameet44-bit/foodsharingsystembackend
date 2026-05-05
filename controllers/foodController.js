const Food = require('../models/Food');

// @desc    Get all foods
// @route   GET /api/foods
exports.getFoods = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, showAll } = req.query;
    let query = {};
    
    // Only filter by availability if not requested to show all
    if (showAll !== 'true') {
      query.isAvailable = true;
    }

    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    let foods = await Food.find(query).populate('cookId', 'name kitchenInfo');
    
    // Filter out static/dummy data that doesn't belong to an actual registered cook
    foods = foods.filter(food => food.cookId != null);
    
    res.json(foods);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get food by ID
// @route   GET /api/foods/:id
exports.getFoodById = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id).populate('cookId', 'name kitchenInfo ratings');
    if (food) {
      res.json(food);
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a food item
// @route   POST /api/foods
exports.createFood = async (req, res) => {
  try {
    const { title, description, price, category, image } = req.body;
    const food = new Food({
      title,
      description,
      price,
      category,
      image,
      cookId: req.user._id
    });

    const createdFood = await food.save();
    res.status(201).json(createdFood);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a food item
// @route   PUT /api/foods/:id
exports.updateFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (food) {
      if (food.cookId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to update this food' });
      }

      food.title = req.body.title || food.title;
      food.description = req.body.description || food.description;
      food.price = req.body.price || food.price;
      food.category = req.body.category || food.category;
      food.image = req.body.image || food.image;
      food.isAvailable = req.body.isAvailable !== undefined ? req.body.isAvailable : food.isAvailable;

      const updatedFood = await food.save();
      res.json(updatedFood);
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a food item
// @route   DELETE /api/foods/:id
exports.deleteFood = async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (food) {
      if (food.cookId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized to delete this food' });
      }
      await food.deleteOne();
      res.json({ message: 'Food removed' });
    } else {
      res.status(404).json({ message: 'Food not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
