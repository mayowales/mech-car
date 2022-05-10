const User = require("../models/User");

const mongoose = require("mongoose");

const users = [
  {
    name: "Michael Quinn",
    email: "mq@gmail.com",
    password: "fake_password",
    role: "driver",
  },
  {
    name: "Emily Smith",
    email: "em@gmail.com",
    password: "fake_password",
    role: "mechanic",
    streetName: "Frankfurter Allee",
    streetNumnber: "1",
    postcode: 12345,
    city: "Berlin",
  },
];

mongoose
  .connect(process.env.MONGO_CONNECT || "mongodb://localhost/mechcar", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
    users.forEach((user) => User.create(user));
  })
  .then(() => console.log("Users successfully created"))
  .then(() => {
    // mongoose.disconnect();
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });
