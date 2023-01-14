// Gives access to the collection in our database
const Character = require("../../models/characterModel");
/*
    11. A) Import the User collection
*/
const User = require("../../models/userModel");

// Return a web page to the client with the entire collection
async function renderAllCharacters(req, res) {
  try {
    let result = await Character.find({});

    // Populates a web page with our entire collection data
    res.render("allChars", { Character: result });
  } catch (error) {
    console.log(`renderAllCharacters error: ${error}`);
  }
}

// Return a web page to the client with ONE document in the collection
async function renderOneCharacter(req, res) {
  try {
    // console.log(`req.params.name: ${req.params.name}`);

    // This returns array, even if it's just one result.
    let result = await Character.find({ name: req.params.name });

    // console.log(`result ${result}`);

    /*
            21. Modify renderOneCharacter() to show the page based on the login session
        */
    let userFaves;

    if (req.session.isAuth) {
      // double check whats on the fav pokemon list
      let currentUser = await User.findOne({
        username: req.session.user.username,
      });
      userFaves = currentUser.favoriteCharacter;
    } else {
      userFaves = [];
    }
    // Use oneMon.ejs file, all data will be in pokemon
    res.render("oneChar", {
      Character: result[0],
      loggedIn: req.session.isAuth,
      userFaves: userFaves,
    });

    // res.render("oneChar", { Character: result[0] });
  } catch (error) {
    console.log(`renderOneCharacter error: ${error}`);
  }
}
// Return a web page where clients can post a new document in the collection
async function renderCreateCharacterForm(req, res) {
  try {
    res.render("createChar");
  } catch (error) {
    console.log(`renderCreateCharacterForm error: ${error}`);
  }
}

async function renderUpdateCharacterForm(req, res) {
  try {
    let result = await Character.find({ name: req.params.name });
    res.render("updateChar", { Character: result[0] });
  } catch (error) {
    console.log(`renderUpdateCharacterForm error: ${error}`);
  }
}

/*
    6. Set up Sign up and Log in functions
*/
async function renderSignUpForm(req, res) {
  try {
    res.render("signUp");
  } catch (error) {
    console.log(`renderSignUpForm error: ${error}`);
  }
}

// return a web page where clients can log in using ther credentials
async function renderLogInForm(req, res) {
  try {
    res.render("logIn");
  } catch (error) {
    console.log(`renderLogInForm error: ${error}`);
  }
}

/*
    11. B) Set up front-end function to render user page
*/
async function renderUserPage(req, res) {
  try {
    // check server to see if the client has user permissions
    if (req.session.isAuth) {
      //grab currently logged in user
      let currentUser = await User.findOne({ _id: req.session.user.id });
      console.log(`req.session: ${req.session}`);
      console.log(`currentUser: ${currentUser}`);
      console.log(
        `currentUser.favoriteCharacter: ${currentUser.favoriteCharacter}`
      );
      //create list for favorite character
      let charNameList = [];
      //convert characters id into names
      for (let i = 0; i < currentUser.favoriteCharacter.length; i++) {
        let oneCharacter = await Character.findOne({
          _id: currentUser.favoriteCharacter[i],
        });

        charNameList.push(oneCharacter.name);
      }
      console.log(`charNameList: ${charNameList}`);
      res.render("user", {
        user: currentUser.username,
        favoriteCharacter: charNameList,
      });
    } else {
      // does this if the login credentials are bad
      res.redirect("logIn");
    }
  } catch (err) {
    console.log(`renderUserPage error: ${err}`);
  }
}
/*
    16. Set up front-end function to log the user out
*/
async function logOutUser(req, res) {
  try {
    res.clearCookie("connect.sid", {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: null,
    });

    //clear the sesson from the server
    req.session.destroy();

    //take the client back to the login page
    res.redirect("/logIn");
  } catch (err) {
    console.log(`logOutUser error: ${err}`);
  }
}

module.exports = {
  renderAllCharacters,
  renderOneCharacter,
  renderCreateCharacterForm,
  renderUpdateCharacterForm,
  renderSignUpForm,
  renderLogInForm,
  renderUserPage,
  logOutUser,
};
