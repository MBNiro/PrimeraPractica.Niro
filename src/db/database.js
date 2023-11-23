import mongoose from "mongoose";

const connectionString =
  "mongodb+srv://maria:muD3iMBZz7IPpxu6@cluster23.c2zreja.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongodb: try {
  await mongoose.connect(connectionString);
  console.log("Conectado a la base de datos");
} catch (error) {
  console.log(error);
}