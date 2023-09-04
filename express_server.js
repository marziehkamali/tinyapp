const express = require("express");
const app = express();
const PORT = 8080;

app.set("view engine", "ejs");

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls", (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.get("/urls/:id", (req, res) => {
  const templateVars = { id: req.params.id, longURL: urlDatabase[req.params.id] };
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {

  let key = generateRandomString()
  urlDatabase[key] = req.body.longURL
  res.redirect(`/urls/${key}`);
});

function generateRandomString() {
  let alphaNum = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let randomStr = "";
  for (let i = 0; i < 6; i++) {
    let result = Math.floor(Math.random() * 35);
    randomStr = randomStr.concat(alphaNum[result]);
  }
  return randomStr;
}

app.get("/u/:id", (req, res) => {
let longURL = urlDatabase[req.params.id];
if(urlDatabase[req.params.id]){
  res.redirect(longURL);
} else {
  res.send("it does not exist");
}
});

app.post("/urls/:id/delete", (req, res) => {
  const idToDelete = req.params.id;
  if (urlDatabase[idToDelete]) {
    delete urlDatabase[idToDelete];
    res.redirect("/urls"); 
  } else {
    res.status(404).send("URL not found");
  }
});








