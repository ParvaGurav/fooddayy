import mongoose from "mongoose";

// export const connectDB = async () => {
//   await mongoose
//     .connect("mongodb://localhost:27017/food-delivery", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => console.log("DB connected to local MongoDB"))
//     .catch((err) => console.error("DB connection error:", err));
// };

const uri = "mongodb+srv://pg-db-server:Abcd1234@pg-cluster.jkidb.mongodb.net/?retryWrites=true&w=majority&appName=PG-Cluster"; 
export const connectDB = async () =>{
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB: ", err);
  });
};

