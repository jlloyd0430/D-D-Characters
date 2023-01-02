// Set up Router functionality
const express = require("express");
const router = express.Router();

// Imports database communications
const {
  getAllCharacters,
  getOneCharacter,
  createOneCharacter,
  deleteOneCharacter,
  updateOneCharacter,
} = require("../../controllers/api/characterController");

// localhost:3333/api/allChars
router.get("/allChars", getAllCharacters);
// localhost:3000/api/oneChar/:name
router.get("/oneChar/:name", getOneCharacter);

// // localhost:3000/api/createOneCharacter
router.post("/createOneCharacter", createOneCharacter);

// //localhost:3000/api/updateOnePokemon/:name
router.put("/updateOneCharacter/:name", updateOneCharacter);

// // localhost:3000/api/deleteOneCharacter/:name
router.delete("/deleteOneCharacter/:name", deleteOneCharacter);

module.exports = router;
