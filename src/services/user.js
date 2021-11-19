const User = require("../models/User");
const bcrypt = require("bcrypt");

async function getUser(PIN) {
  return User.find({ PIN }).exec(); // Just as a mongoose reminder, .exec() on find
  // returns a Promise instead of the standard callback.
}

async function checkAUserExist() {
  await User.db.db.listCollections().toArray(function (err, names) {
    if (err) {
      return true;
    } else {
      names.forEach(function (e, i, a) {
        collections.push(e.name);
      });
    }
    return collections.includes("users");
  });
}

async function createUser(confirmPIN) {
  const exists = await checkAUserExist();
  console.log(exists);
  const newUser = new User({
    PIN: bcrypt.hashSync(confirmPIN, 12),
  });
  await newUser.save((err) => {
    if (err) {
      console.log(err);
      return err;
    }
  });
  return true;
}

module.exports = { createUser, getUser };
