const { Router } = require("express");
const { sendSequence } = require("../controllers/program");

const router = Router();

router.post("/sendSequence", async (req, res, next) => {
  try {
    const result = await sendSequence(req.body.sequence);
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
