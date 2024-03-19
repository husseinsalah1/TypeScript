import mongoose from "mongoose";
class Database {
  static async connect(url: string) {
    try {
      await mongoose.connect(url);
      console.log("Database Connection Successfully");
    } catch (error) {
      console.log("Database Connection Failed");
    }
  }
}

export default Database;
