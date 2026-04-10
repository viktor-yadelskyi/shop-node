const express = require("express");

const errorController = require("./controllers/404");
const mongoConnect = require("./util/database");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

mongoConnect((client) => {
  console.log(client);
  app.listen(3000);
});
