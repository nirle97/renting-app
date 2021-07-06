import { app } from "./app";
import mongoose from "mongoose";

const PORT = 5000;
mongoose
  .connect("mongodb://localhost:27017/rent", {
    // .connect("mongodb://mongodb-rent:27017/rent", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("server connected to MongoDB");
    app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
  })
  .catch((error) => {
    console.error("error connecting to MongoDB: ", error.message);
  });

module.exports = app;
