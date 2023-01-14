// Import express, set up router
const express = require("express");
const router = express.Router();

// // Import functionality from the view controller
const {
  renderAllCharacters,
  renderOneCharacter,
  renderCreateCharacterForm,
  renderUpdateCharacterForm,
  renderLogInForm,
  renderSignUpForm,
  renderUserPage,
  logOutUser,
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

/*
    7. Set up sign-up and log-in form routes
*/

//localhost:3000/signUp
router.get("/signUp", renderSignUpForm);

//localhost3000:/logIn
router.get("/logIn", renderLogInForm);

/*
    12. Set up front-end route for the user page
*/
//localhost3000:/user
router.get("/user", renderUserPage);
/*
    17. Set up log out route to end sessions
*/
//localhost:3000/logout
router.get("/logout", logOutUser);

module.exports = router;
