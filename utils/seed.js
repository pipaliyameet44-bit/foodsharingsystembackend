const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Food = require('../models/Food');

dotenv.config();

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
    location: 'Central Plaza, New York'
  },
  {
    name: 'Maria Chef',
    email: 'maria@example.com',
    password: 'password123',
    role: 'cook',
    location: 'Brooklyn, NY',
    kitchenInfo: {
      kitchenName: "Maria's Homemade Delights",
      description: "Authentic Italian and Mediterranean dishes made with love.",
      isVerified: true
    }
  },
  {
    name: 'John Cook',
    email: 'john@example.com',
    password: 'password123',
    role: 'cook',
    location: 'Queens, NY',
    kitchenInfo: {
      kitchenName: "Chef John's Spicy Corner",
      description: "Bringing the best of Asian fusion to your doorstep.",
      isVerified: false
    }
  },
  {
    name: 'Test User',
    email: 'user@example.com',
    password: 'password123',
    role: 'user',
    location: 'Manhattan, NY'
  }
];

const foods = [
  // Main Course
  {
    title: 'Homemade Lasagna',
    description: 'Rich layers of pasta, beef ragu, and creamy béchamel sauce.',
    price: 450,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    title: 'Butter Chicken with Naan',
    description: 'Tender chicken in a velvety tomato-butter sauce, served with garlic naan.',
    price: 380,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1603894584202-9cb8f4381999?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    title: 'Vegetable Paella',
    description: 'Authentic Spanish rice dish with saffron and garden fresh vegetables.',
    price: 320,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1534080564607-c987d6666f00?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    title: 'Beef Stroganoff',
    description: 'Sautéed pieces of beef served in a sauce with smetana (sour cream).',
    price: 420,
    category: 'Main Course',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },

  // Veg
  {
    title: 'Veggie Buddha Bowl',
    description: 'Fresh greens, quinoa, roasted chickpeas, and tahini dressing.',
    price: 280,
    category: 'Veg',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    title: 'Paneer Tikka Masala',
    description: 'Grilled paneer cubes in a spiced tomato-based gravy.',
    price: 310,
    category: 'Veg',
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    title: 'Mushroom Risotto',
    description: 'Creamy Italian rice dish cooked with wild mushrooms and parmesan.',
    price: 350,
    category: 'Veg',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    title: 'Stuffed Bell Peppers',
    description: 'Peppers filled with spiced rice, beans, and melted cheese.',
    price: 260,
    category: 'Veg',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },

  // Non-Veg
  {
    title: 'Spicy Thai Curry',
    description: 'Red curry with coconut milk, bamboo shoots, and tender chicken.',
    price: 380,
    category: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    title: 'Grilled Salmon with Asparagus',
    description: 'Atlantic salmon fillet grilled to perfection with lemon butter.',
    price: 550,
    category: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    title: 'BBQ Pulled Pork Sliders',
    description: 'Slow-cooked pork shoulder shredded and tossed in tangy BBQ sauce.',
    price: 340,
    category: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1527335013032-ee869186edec?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    title: 'Lamb Shepherd\'s Pie',
    description: 'Traditional minced lamb topped with creamy mashed potatoes.',
    price: 480,
    category: 'Non-Veg',
    image: 'https://images.unsplash.com/photo-1533777857417-3fa9479ed79c?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },

  // Snacks
  {
    title: 'Crispy Samosas',
    description: 'Handmade flaky pastry filled with spiced potatoes and peas.',
    price: 120,
    category: 'Snack',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    title: 'Chicken Spring Rolls',
    description: 'Golden fried rolls stuffed with minced chicken and glass noodles.',
    price: 180,
    category: 'Snack',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    title: 'Loaded Nachos',
    description: 'Tortilla chips topped with cheese, jalapeños, and fresh salsa.',
    price: 220,
    category: 'Snack',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    title: 'Honey Chilli Cauliflower',
    description: 'Crispy cauliflower florets tossed in a sweet and spicy sauce.',
    price: 190,
    category: 'Snack',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },

  // Desserts
  {
    title: 'Chocolate Lava Cake',
    description: 'Warm, gooey chocolate center with a scoop of vanilla ice cream.',
    price: 240,
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1624353335558-68dd143588e7?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    title: 'New York Cheesecake',
    description: 'Creamy cheesecake on a graham cracker crust with berry compote.',
    price: 280,
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    title: 'Classic Tiramisu',
    description: 'Coffee-soaked ladyfingers layered with mascarpone cream.',
    price: 300,
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    title: 'Gulab Jamun with Rabri',
    description: 'Soft milk dumplings in sugar syrup served with thickened milk.',
    price: 200,
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1589119908995-c6837fa14848?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  },
  {
    title: 'Mango Sorbet',
    description: 'Refreshing dairy-free frozen treat made with real mangoes.',
    price: 150,
    category: 'Dessert',
    image: 'https://images.unsplash.com/photo-1505394033343-4fd3f5a32ad0?auto=format&fit=crop&q=80&w=800',
    isAvailable: true
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/food_sharing');
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Food.deleteMany({});

    // Insert Users
    const createdUsers = await User.create(users);
    console.log('Users Seeded');

    const cookMaria = createdUsers.find(u => u.email === 'maria@example.com');
    const cookJohn = createdUsers.find(u => u.email === 'john@example.com');

    // Assign cooks to foods
    const foodsWithCooks = foods.map((food, index) => ({
      ...food,
      cookId: index % 2 === 0 ? cookMaria._id : cookJohn._id
    }));

    await Food.create(foodsWithCooks);
    console.log('Foods Seeded');

    console.log('Database Seeded Successfully!');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDB();
