// Gives access to the collection in our database
const Character = require("../../models/characterModel");

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
    console.log(`req.params.name: ${req.params.name}`);

    // This returns array, even if it's just one result.
    let result = await Character.find({ name: req.params.name });

    // console.log(`result ${result}`);

    // Use oneMon.ejs file, all data will be in pokemon
    res.render("oneChar", { Character: result[0] });
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
module.exports = {
  renderAllCharacters,
  renderOneCharacter,
  renderCreateCharacterForm,
  renderUpdateCharacterForm,
};
