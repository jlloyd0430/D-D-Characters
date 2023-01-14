const User = require("../../models/userModel");
const bcrypt = require("bcrypt");

const Character = require("../../models/characterModel");

async function createUser(req, res) {
  try {
    // gather the credentials from the client
    const { username, password } = req.body;

    // generate salt
    let salt = await bcrypt.genSalt(10);

    // encrypt the password with the salt
    let encryptedPassword = await bcrypt.hash(password, salt);

    // generate user doc
    let userObj = {
      username: username,
      password: encryptedPassword,
    };

    // generate user document
    await User.create(userObj);

    //respond to the client
    // res.json({
    //   message: "success",
    //   payload: userObj,
    // });

    res.redirect("/logIn");
  } catch (err) {
    //server-side
    console.log(`createUser error: ${err}`);

    //client-side
    res.json({
      message: "error",
      payload: err,
    });
  }
}

// create a function that handles the login session
async function logInUser(req, res) {
  try {
    //findOne user that matches the username
    const user = await User.findOne({ username: req.body.username });
    // console.log(user);
    // if no user , throw an error
    if (!user) {
      throw "Error: User not found";
    } else {
      // bcrypt compares the incoming password against the database password
      let comparedPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (!comparedPassword) {
        throw "Error: Incorrect password please check and try again.";
      } else {
        //give login authority to the session
        req.session.isAuth = true;
        // generate user obj to attatch to the serverside session
        let userObj = {
          username: user.username,
          id: user._id,
        };

        req.session.user = userObj;
        // console.log(req.session);
        res.redirect("/user");
      }
    } // end of
  } catch (err) {
    //serverside
    console.log(`logInUser: ${err}`);

    //clientside
    res.json({
      message: "failure",
      payload: `logInUser: ${err}`,
    });
  }
}

async function addFavoriteCharacterToUser(req, res) {
  try {
    // back end version
    // let userId = req.body.userId;

    //front end version
    let userId = req.session.user.id;

    // gather current pokemon id
    let charId = req.body.charId;

    // find the currently logged in user
    let currentUser = await User.findOne({ _id: userId });
    // check if character is already listed in favorites
    let isAlreadyFavorite = currentUser.favoriteCharacter.includes(charId);

    if (isAlreadyFavorite) {
      throw "Error: Character is already on favorites list";
    } else {
      // add the characters id to the fav pokemon list
      currentUser.favoriteCharacter.push(charId);

      //generate a clean object tochange only the necessary properties on the user document
      let newUserObj = {
        favoriteCharacter: currentUser.favoriteCharacter,
      };
      await currentUser.save();

      //back-end version
      // res.json({
      //   message: "sucsss",
      //   payload: currentUser,
      // });

      //front-end version
      res.redirect("/user");
    }
  } catch (err) {
    console.log(`addFavoriteCharacterToUser: ${err}`);
  }
}

module.exports = {
  createUser,
  logInUser,
  addFavoriteCharacterToUser,
};
