const express = require("express");
const router = express.Router();
const {
  createUser,
  logInUser,
  addFavoriteCharacterToUser,
} = require("../../controllers/api/userController");

//localhost:3000/api/user/createUser
router.post("/createUser", createUser);
//localhost:3000/api/user/logInUser
router.post("/logInUser", logInUser);

//localhost:3000/api/user/addFavoriteCharacter
router.put("/addFavoriteCharacter", addFavoriteCharacterToUser);

module.exports = router;
