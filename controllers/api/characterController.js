const Character = require("../../models/characterModel");

async function getAllCharacters(req, res) {
  try {
    // result awaits the promise
    let result = await Character.find({});

    res.json({
      message: "success",
      payload: result,
    });
  } catch (err) {
    console.log(`getAllCharacters error: ${err}`);

    res.json({
      message: "failure",
      payload: err,
    });
  }
}

async function getOneCharacter(req, res) {
  try {
    let result = await Character.find({ name: req.params.name });

    res.json({
      message: "success",
      payload: result,
    });
  } catch (err) {
    console.log(`getOneCharacter error: ${err}`);

    res.json({
      message: "failure",
      payload: err,
    });
  }
}

async function createOneCharacter(req, res) {
  try {
    // Accept the front-end form data from the client, generates the document
    let newCharacter = {
      name: req.body.name,
      id: req.body.id,
      class: req.body.class,
      level: req.body.level,
      race: req.body.race,
    };

    // Post new document to the Character  collection
    await Character.create(newCharacter);

    // Redirect the client to the single character page for the created Character
    res.redirect(`/oneChar/${newCharacter.name}`);
  } catch (err) {
    // server-side
    console.log(`createOneCharacter error: ${err}`);

    // client-side
    res.json({
      message: "failure",
      payload: `createOneCharacter error: ${err}`,
    });
  }
}

async function deleteOneCharacter(req, res) {
  try {
    let deleteTarget = req.params.name;

    // Find ONE document by name and remove it from the collection
    await Character.deleteOne({ name: deleteTarget });

    // res.json({
    //     message: "success",
    //     payload: deleteTarget
    // });

    // Return the client to the webpage that shows the entire collection
    res.redirect("/allChars");
  } catch (err) {
    // server-side
    console.log(`deleteOneCharacter error: ${err}`);

    // client-side
    res.json({
      message: "failure",
      payload: `deleteOneCharacter error: ${err}`,
    });
  }
}

async function updateOneCharacter(req, res) {
  try {
    // let updatedChar = req.body;
    let updatedChar = {
      id: req.body.id,
      name: req.body.name,
      class: req.body.class,
      level: req.body.level,
      race: req.body.race,
    };

    await Character.updateOne(
      // target the document to be updated
      { name: req.params.name },
      //inseet the doc, wit updated dertails
      { $set: updatedChar },
      //upsert isupdate + insert. this setting is = true
      { upsert: true }
    );

    // res.json({
    //   message: "success",
    //   payload: updatedChar,
    // });
    res.redirect(`/oneChar/${updatedChar.name}`);
  } catch (error) {
    console.log(`updateOneCharacter: ${error}`);

    //client side
    res.json({
      message: error,
      payload: `updateOneCharacter: ${error}`,
    });
  }
}

module.exports = {
  getAllCharacters,
  getOneCharacter,
  createOneCharacter,
  deleteOneCharacter,
  updateOneCharacter,
};
