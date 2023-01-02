const express = require("express");
const app = express();
const path = require("path");
const logger = require("morgan");
const methodOverride = require("method-override");

// connection to our database
const connectToMongoDB = require("./database/mongodb");

/*
    Setting up middleware
*/

// We can use HTML methods with back-end methods smoothly
app.use(methodOverride("_method"));
// view engine settings
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
// Logging every request in the terminal
app.use(logger("dev"));
// Read incoming requests properly
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*
    Connecting routers, using URL extensions
*/

// Back-end
const characterRouter = require("./routes/api/characterRouter");
app.use("/api", characterRouter);

// front end
const viewsRouter = require("./routes/viewRouters/viewRouter");
app.use("/", viewsRouter);

let PORT = 3333;

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);

  connectToMongoDB();
});
