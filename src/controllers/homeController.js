const getHomePage = (req, res) => {
  res.send("Hello World for Developer");
};

const abc = (req, res) => {
  // res.send("Hello World! from abc");
  res.render("sample.ejs");
};
module.exports = {
  getHomePage,
  abc,
};
