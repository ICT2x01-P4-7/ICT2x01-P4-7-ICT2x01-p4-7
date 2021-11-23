const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { accessTokenSecret } = require("../config/config.js");

const saltRounds = 10;

class UserService {
  constructor(PIN, choosePIN, confirmPIN) {
    this.PIN = PIN;
    this.choosePIN = choosePIN;
    this.confirmPIN = confirmPIN;
  }

  async checkACollectionExist() {
    const collections = [];

    const foundCollections = await User.db.db
      .listCollections({ name: "users" })
      .toArray();
    if (foundCollections) {
      foundCollections.forEach(function (e, i, a) {
        collections.push(e.name);
      });
      if (collections.includes("users")) {
        return true;
      }
    }
    return false;
  }

  async checkAUserExist() {
    const collectionExists = this.checkACollectionExist();
    if (collectionExists) {
      const foundUser = await User.find({}).exec();
      if (foundUser.length > 0) {
        return true;
      }
      return false;
    }
  }

  async login() {
    try {
      const foundUser = await User.find({}).exec();
      if (foundUser.length != 0) {
        const hashedPIN = foundUser[0].PIN;
        const cmp = await bcrypt.compare(this.PIN, hashedPIN);
        if (cmp) {
          const token = jwt.sign({}, accessTokenSecret, { expiresIn: "1h" });
          return {
            message: "Successfully logged in.",
            success: true,
            token: token,
          };
        } else {
          return {
            message: "User does not exist or PIN is incorrect",
            success: false,
          };
        }
      } else {
        return {
          message: "A user does not exist.",
          success: false,
        };
      }
    } catch (e) {
      console.log(`From userService: ${e}`);
      return {
        message: "An error occured in UserService",
        success: false,
      };
    }
  }

  async createUser() {
    try {
      if (this.confirmPIN != this.choosePIN) {
        return {
          message: "PINs do not match. Please try again",
          success: false,
        };
      }
      const userExists = await this.checkAUserExist();
      if (userExists) {
        return { message: "A user already exists", success: false };
      }
      const hashedPin = await bcrypt.hash(this.confirmPIN, saltRounds);
      const newUser = new User({
        PIN: hashedPin,
      });
      await newUser.save((err) => {
        if (err) {
          console.log("Error from newUser.save", err);
          throw new Error("There was an error saving the user");
        }
      });
      return {
        message: "User successfully created",
        success: true,
      };
    } catch (e) {
      console.log(`From userService: ${e}`);
      return { message: "An error occurred", success: false };
    }
  }

  async resetPIN() {
    try {
      if (!this.PIN || !this.choosePIN || !this.confirmPIN) {
        return {
          message: "A required parameter is missing. Please try again",
          success: false,
        };
      }
      if (this.confirmPIN != this.choosePIN) {
        return {
          message: "PINs do not match. Please try again",
          success: false,
        };
      }
      if (this.PIN === this.confirmPIN) {
        return {
          message:
            "New PIN is the same as the old PIN. Please choose a different PIN",
          success: false,
        };
      }
      const exists = await this.checkAUserExist();
      if (exists) {
        const foundUser = await User.find({}).exec();
        if (foundUser.length != 0) {
          const user = foundUser[0];
          const hashedPIN = user.PIN;
          const cmp = await bcrypt.compare(this.PIN, hashedPIN);
          if (cmp) {
            const newHashedPin = await bcrypt.hash(this.confirmPIN, saltRounds);
            await User.findByIdAndUpdate(user._id, { PIN: newHashedPin });
            return {
              message: "PIN successfully reset",
              success: true,
            };
          } else {
            return {
              message: "User does not exist or incorrect PIN",
              success: false,
            };
          }
        } else {
          return {
            message: "User does not exist or incorrect PIN",
            success: false,
          };
        }
      }
    } catch (e) {
      console.log(`From userService: ${e}`);
      return { message: "An error occurred", success: false };
    }
  }
}

module.exports = { UserService };
