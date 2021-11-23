const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { accessTokenSecret } = require("../config/config.js");

const { saltRounds } = require("../config/config.js");

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
    let updates;
    try {
      const Users = await User.find({}).exec();
      if (Users.length != 0) {
        const foundUser = Users[0];
        const hashedPIN = foundUser.hashed_PIN;

        if (foundUser.isLocked) {
          // just increment login attempts if account is already locked
          const { lockUntil, updates } = foundUser.incLoginAttempts();
          User.updateOne({ _id: foundUser._id }, updates).exec();
          return {
            message: `You have exceed the max login attempts(5). Barred from logging in for the next 5 minutes.`,
            success: false,
            lockUntil: lockUntil,
          };
        }
        const cmp = await User.authenticate(this.PIN, hashedPIN);
        if (cmp) {
          const token = jwt.sign({}, accessTokenSecret, { expiresIn: "1h" });
          return {
            message: "Successfully logged in.",
            success: true,
            token: token,
          };
        } else {
          const { lockUntil, updates } = foundUser.incLoginAttempts();
          User.updateOne({ _id: foundUser._id }, updates).exec();
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
      let result = await new User({
        PIN: this.confirmPIN,
      }).save();
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
          const hashedPIN = user.hashed_PIN;
          const cmp = await User.authenticate(this.PIN, hashedPIN);
          if (cmp) {
            const newHashedPin = await bcrypt.hash(this.confirmPIN, saltRounds);
            await User.findByIdAndUpdate(user._id, {
              hashed_PIN: newHashedPin,
            });
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
