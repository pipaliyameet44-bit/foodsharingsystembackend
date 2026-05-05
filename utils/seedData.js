const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Food = require('../models/Food');

dotenv.config();

const foods = [
  {
    title: "Homemade Paneer Butter Masala",
    description: "Rich and creamy tomato-based curry with fresh cottage cheese cubes, made with pure butter and secret home spices.",
    price: 250,
    category: "Veg",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7"
  },
  {
    title: "Mom's Special Chicken Biryani",
    description: "Fragrant basmati rice cooked with tender chicken pieces, saffron, and aromatic whole spices. Served with raita.",
    price: 320,
    category: "Non-Veg",
    image: "https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8"
  },
  {
    title: "Classic Gulab Jamun (4pcs)",
    description: "Soft, melt-in-the-mouth khoya balls soaked in cardamom flavored sugar syrup.",
    price: 120,
    category: "Dessert",
    image: "https://images.unsplash.com/photo-1589119908995-c6837fa14848"
  },
  {
    title: "Crispy Vegetable Samosas",
    description: "Hand-folded pastry filled with spiced potatoes and peas. Served with mint chutney.",
    price: 80,
    category: "Snack",
    image: "https://images.unsplash.com/photo-1601050633647-81a3173772ed"
  },
  {
    title: "Homestyle Dal Tadka & Jeera Rice",
    description: "Yellow lentils tempered with cumin, garlic, and red chilies. Accompanied by fragrant cumin rice.",
    price: 180,
    category: "Veg",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d"
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food_sharing');
    
    // Clear existing data (Optional)
    // await Food.deleteMany();
    // await User.deleteMany();

    // Create a default cook if not exists
    let cook = await User.findOne({ role: 'cook' });
    if (!cook) {
      cook = await User.create({
        name: "Chef Maria",
        email: "cook@example.com",
        password: "password123",
        role: "cook",
        location: "Mumbai, India",
        kitchenInfo: {
          kitchenName: "Maria's Home Kitchen",
          description: "Traditional recipes passed down through generations.",
          isVerified: true
        }
      });
      console.log('Sample Cook Created');
    }

    // Add foods for this cook
    const foodsWithCook = foods.map(f => ({ ...f, cookId: cook._id }));
    await Food.insertMany(foodsWithCook);
    
    console.log('Sample Foods Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
