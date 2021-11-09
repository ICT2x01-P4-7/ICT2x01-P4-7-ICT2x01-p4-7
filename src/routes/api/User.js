const { Router } = require("express");
const User = require("../../models/User");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const User = await User.find();
    if (!User) throw new Error("No User");
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const newUser = new User(req.body);
  try {
    const User = await newUser.save();
    if (!User) throw new Error("Something went wrong with saving the user");
    res.status(200).json(User);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
