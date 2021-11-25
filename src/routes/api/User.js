const { Router } = require("express");
const User = require("../../models/User");
//const user;
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
// Create new user
router.post("/create", async (req, res, next) => {
  try {
    // Check Confirm PIN and Choose PIN is same
    if (req.body.confirmPIN != req.body.choosePIN) {
      console.log("PINs do not match. Please try again");
      throw new Error("PINs do not match. Please try again");
    }
    // Check database if have same PIN number
    // user is not define
    // ME stop here
    hashpassword = bcrypt.hashSync(req.body.confirmPIN, 12)
    console.log(hashpassword);
    User.find({PIN: hashpassword})
    .exec()
    .then(
      user =>{
        if (user.length >= 1){
          console.log("Have");
        }
      }
    )
    .catch()
    
  // bcrypt.compare(req.body.choosePIN, User[0], (err, res) => {
        
  //       if (res) {
  //         console.log('PIN Number have been used');
  
  //       }
  //       // If PIN is not in database
  //       if (err) {
  //         const newUser = new User({
  //           PIN: bcrypt.hashSync(req.body.confirmPIN, 12),
  //         });
  //         const saveUser = newUser.save();
  //         console.log("created User");
  //       }
  
  //     })
    
   
    // Error handling
    if (!User) throw new Error("Something went wrong with saving the user");
    res.status(200).json(User);
  } 
  catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});
router.post("/login", async (req, res, next) => {
  // Check PIN is in database
  
  bcrypt.compare(req.body.PIN, User[0], (err, res) => {
    if (err) {
    // PIN is not in database
      console.log("No PIN found");
    }
    if (res) {
      // PIN in database
      return res.status(200).json({
        message: 'Auth successful'
      });
    }
    // PIN not in database
    // return res.status.json({
    //   message: 'Auth failed'
    // });
  })

});


module.exports = router;
