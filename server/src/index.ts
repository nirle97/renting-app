import { app } from "./app";
import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/rent", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("server connected to MongoDB");
    app.listen(8080, () => console.log("app is listening on port 8080"));
  })
  .catch((error) => {
    console.error("error connecting to MongoDB: ", error.message);
  });

module.exports = app;
