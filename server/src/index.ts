import { app } from "./app";
import mongoose from "mongoose";
require("dotenv").config();
const PORT = 5000;

mongoose
  .connect(`mongodb://${process.env.LOCAL_DB_NAME}:27017/rent`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`server connected to ${process.env.LOCAL_DB_NAME} database`);
    app.listen(PORT, () => console.log(`app is listening on port ${PORT}`));
  })
  .catch((error) => {
    console.error("error connecting to MongoDB: ", error.message);
  });

module.exports = app;
