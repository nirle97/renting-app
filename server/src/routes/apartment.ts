export const apartment = require("express").Router();
import aptController from "../controllers/aptController"
apartment.post("/create", aptController.addNewApt)
apartment.post("/create", aptController.addNewApt)


// get - apts by filters
// get- apts by owner
// post- like/dislike
// post- use preferences
// post- create + new apt 
