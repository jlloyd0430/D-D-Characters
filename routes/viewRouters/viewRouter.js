// Import express, set up router
const express = require("express");
const router = express.Router();

// // Import functionality from the view controller
const {
  renderAllCharacters,
  renderOneCharacter,
  renderCreateCharacterForm,
  renderUpdateCharacterForm,
} = require("../../controllers/view/viewController");

router.get("/", (req, res) => {
  res.render("index");
});

// localhost:3333/allChars
router.get("/allChars", renderAllCharacters);

//localhost:3333/oneChar
router.get("/oneChar/:name", renderOneCharacter);

//localhost:3333/createChar
router.get("/createChar", renderCreateCharacterForm);

//localhost:300/updateMon/:name
router.get("/updateChar/:name", renderUpdateCharacterForm);

module.exports = router;
