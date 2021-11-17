const { Router } = require("express");
const User = require("../models/User");

const router = Router();
const bcrypt = require("bcrypt");
router.get("/", async (req, res) => {
  try {
    const User = await User.find();
    if (!User) throw new Error("No User");
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/create", async (req, res, next) => {
  try {
    if (req.body.confirmPIN != req.body.choosePIN) {
      console.log("PINs do not match. Please try again");
      throw new Error("PINs do not match. Please try again");
    }
    const newUser = new User({
      PIN: bcrypt.hashSync(req.body.confirmPIN, 12),
    });
    const saveUser = await newUser.save((err) => {
      if (err) {
        return err;
      }
    });
    if (!User) throw new Error("Something went wrong with saving the user");
    res.status(200).json(User);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
