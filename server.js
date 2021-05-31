const express = require("express");

const apiRoutes = require("./Develop/routes/apiRoutes");
const htmlRoutes = require("./Develop/routes/htmlRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static("./Develop/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// logs incoming data from local host
const logger = (req, res, next) => {
  console.log(`${req.protocol}://${req.get("host")}${req.originalUrl}`);
  next();
};
// Init middleware
app.use(logger);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}`);
});



