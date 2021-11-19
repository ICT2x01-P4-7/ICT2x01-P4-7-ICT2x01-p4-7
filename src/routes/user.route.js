const { Router } = require("express");
const { getUser, createUser } = require("../controllers/user");

const router = Router();

/** TO DO: NOT YET CREATED! */
router.get("/login", async (req, res) => {
  try {
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const result = await createUser(req.body.confirmPIN, req.body.choosePIN);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
