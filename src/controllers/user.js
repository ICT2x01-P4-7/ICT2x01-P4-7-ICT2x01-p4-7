const {
  getUser: getUserService,
  createUser: createUserService,
} = require("../services/user.js");

/**
 * Get a user by PIN
 * @param username a string value that represents user's username.
 * @returns A Promise, an exception or a value.
 */
function getUser(username) {
  if (username === "") {
    throw new Error("Username can't be blank");
  }
  return getUserService(username);
}

/**
 * Create a user
 * @param confirmPIN Integer to represent PIN.
 *
 * @returns A Promise, an exception or a value.
 */

function createUser(confirmPIN, choosePIN) {
  if (confirmPIN != choosePIN) {
    console.log("PINs do not match. Please try again");
    throw new Error("PINs do not match. Please try again");
  }
  return createUserService(confirmPIN);
}

module.exports = { createUser, getUser };
