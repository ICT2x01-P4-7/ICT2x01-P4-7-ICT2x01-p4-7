const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { accessTokenSecret } = require("../config/config.js");

const saltRounds = 10;

/**
 * Get a user by PIN. Throws error if incorrect PIN.
 * @param PIN Integer to represent PIN.
 * @returns A token
 */
async function getUser(PIN) {
  const foundUser = await User.find({}).exec();
  if (foundUser.length != 0) {
    const hashedPIN = foundUser[0].PIN;
    const cmp = await bcrypt.compare(PIN, hashedPIN);
    if (cmp) {
      const token = jwt.sign({}, accessTokenSecret, { expiresIn: "1h" });
      return token;
    } else {
      throw new Error("User does not exist or incorrect PIN.");
    }
  } else {
    throw new Error("There was a problem authenticating..");
  }
}

/**
 * Helper function to check if there is any user in database.
 * @param {Integer} PIN Integer to represent PIN.
 * @returns {Boolean}
 */
async function checkAUserExist() {
  collections = [];
  exist = false;
  const foundCollections = await User.db.db
    .listCollections({ name: "users" })
    .toArray();
  foundCollections.forEach(function (e, i, a) {
    collections.push(e.name);
  });
  if (collections.includes("users")) {
    return true;
  }
  return false;
}

/**
 * Create user.
 * @param {Integer} confirmPIN Integer to represent PIN.
 */

async function createUser(confirmPIN) {
  const exists = await checkAUserExist();
  if (exists) {
    throw new Error("A user already exists.");
  }
  const hashedPin = await bcrypt.hash(confirmPIN, saltRounds);
  const newUser = new User({
    PIN: hashedPin,
  });
  await newUser.save((err) => {
    if (err) {
      console.log("Error from newUser.save", err);
      throw new Error("There was an error saving the user");
    }
  });
}

module.exports = { createUser, getUser };
