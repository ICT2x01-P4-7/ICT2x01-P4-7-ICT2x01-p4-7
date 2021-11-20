const {
  getUser: getUserService,
  createUser: createUserService,
} = require("../services/user.js");

/**
 * Get a user by PIN
 * @param PIN Integer to represent PIN.
 * @returns A Promise, an exception or a value.
 */
async function getUser(PIN) {
  if (!PIN) {
    throw new Error("PIN can't be blank");
  }
  return getUserService(PIN);
}

/**
 * Create a user
 * @param confirmPIN Integer to represent PIN.
 * @param choosePIN Integer to represent PIN.
 * @returns A Promise, an exception or a value.
 */

async function createUser(confirmPIN, choosePIN) {
  if (confirmPIN != choosePIN) {
    console.log("PINs do not match. Please try again");
    throw new Error("PINs do not match. Please try again");
  }
  return createUserService(confirmPIN);
}

module.exports = { createUser, getUser };
