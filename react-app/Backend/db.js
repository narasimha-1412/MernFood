const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://tony123:tony123@cluster0.g0p3eel.mongodb.net/MernFoodDB?retryWrites=true&w=majority&appName=AtlasApp';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
    console.log('Connected to MongoDB');

    const fetched_data = mongoose.connection.db.collection("foodData2");
    const data = await fetched_data.find({}).toArray(); // Wait for the data to be fetched

    // console.log(data); // Log the data

    // global.food_items=data   //for global usage
    // console.log(global.food_items)

    const foodCategory=mongoose.connection.db.collection("foodCategory");
    const data2 = await foodCategory.find({}).toArray();

    global.food_items=data 
    global.food_category=data2 

  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectMongoDB;
