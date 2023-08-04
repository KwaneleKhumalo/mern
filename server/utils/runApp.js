import mongoose from "mongoose";

const runApp = async (app, port) => {
  try {
    const connectToDb = await mongoose.connect(process.env.MONGO_URI)
    connectToDb ? app.listen(port, console.log('Connected to DB. App is Running.')) : console.log('Failed to connect to db. App is not running.')
  } catch (error) {
    console.log(error);
  }
}

export default runApp