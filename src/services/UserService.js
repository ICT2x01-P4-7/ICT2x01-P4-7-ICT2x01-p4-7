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
  /* istanbul ignore next */
  async checkACollectionExist() {
    /* istanbul ignore next */
    const collections = [];
    /* istanbul ignore next */
    const foundCollections = await User.db.db
      .listCollections({ name: "users" })
      .toArray();
    /* istanbul ignore next */
    if (foundCollections) {
      foundCollections.forEach(function (e, i, a) {
        collections.push(e.name);
      });
      /* istanbul ignore next */
      if (collections.includes("users")) {
        return true;
      }
    }
    /* istanbul ignore next */
    return false;
  }

  async checkAUserExist() {
    const collectionExists = this.checkACollectionExist();
    if (collectionExists) {
      const foundUser = await User.find({}).exec();

      if (foundUser.length > 0 && foundUser[0].hashed_PIN) {
        return true;
      }
      return false;
    }
  }

  async login() {
    let updates;
    try {
      const Users = await User.find({}).exec();
      if (Users.length != 0 && Users[0].hashed_PIN) {
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
          const { updates } = foundUser.incLoginAttempts();
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
      /* istanbul ignore next */
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
        if (foundUser.length != 0 && foundUser[0].hashed_PIN) {
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
        }
      } else {
        return {
          message: "A user does not exist.",
          success: false,
        };
      }
    } catch (e) {
      /* istanbul ignore next */
      return { message: "An error occurred", success: false };
    }
  }
}

module.exports = { UserService };
