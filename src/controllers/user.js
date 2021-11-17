const UserService = require("../services/user");

const UserServiceInstance = new UserService();

module.exports = { createUser };

/**
 * @description Create a User with the provided body
 * @param req {object} Express req object
 * @param res {object} Express res object
 * @returns {Promise<*>}
 */

async function createUser(req, res) {
  try {
    // We only pass the body object, never the req object
    const createdUser = await UserServiceInstance.create(req.body);
    return res.send(createdUser);
  } catch (err) {
    res.status(500).send(err);
  }
}
