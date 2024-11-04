const path = require("path");
const express = require("express");

const configViewEngine = (app) => {
  // config template engine
  console.log("check >>> ", path.join("./src", "views"));
  app.set("views", path.join("./src", "views")); // Thay "view" bằng "views"
  app.set("view engine", "ejs");

  // config static files
  app.use(express.static(path.join("./src", "public")));
};

module.exports = configViewEngine;
