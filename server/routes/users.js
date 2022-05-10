var express = require("express");
var router = express.Router();
const User = require("../models/User");

/* GET users listing. */
router.get("/alldriver", (req, res, next) => {
  User.find({ role: "driver" })
    .then((allDriver) => {
      res.json(allDriver);
    })
    .catch((error) => res.json(error));
});

router.get("/allMechanic", (req, res, next) => {
  User.find({ role: "mechanic" })
    .then((allMechanic) => {
      res.json(allMechanic);
    })
    .catch((error) => res.json(error));
});

router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((user) => res.json(user))
    .catch((error) => res.json(error));
});

router.put("/:userId", (req, res) => {
  const { userId } = req.params;
  const { name, email, streetName, streetNumber, postCode, city } = req.body;

  User.findByIdAndUpdate(
    userId,
    {
      name,
      email,
      streetName,
      streetNumber,
      postCode,
      city,
    },
    { new: true }
  )
    .then((updatedUser) => res.json(updatedUser))
    .catch((error) => res.json(error));
});

router.delete("/:userId", (req, res) => {
  const { userId } = req.params;

  User.findByIdAndRemove(userId)
    .then(() =>
      res.json({
        message: `User with ${userId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
