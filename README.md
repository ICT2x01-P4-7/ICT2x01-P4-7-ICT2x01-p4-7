# ICT2x01-P4-7 TileUp!

TileUp is a gamified web portal for controlling MSP432 robotic car.

# Prerequisite

- npm version >6.14

# How it works

The project is using the MEVN Stack. MongoDB(M), ExpressJS(E) , VueJS(V), NodeJS(N).

Monorepo containing both the frontend and backend. The backend is in `src/`. The backend consist of MongoDB, ExpressJS and NodeJS
The VueJS frontend is nested within the backend directory `src/client`.

## Architecture

The project follows the MVC+Service layer design pattern. (MVCS)

![MVCS Architecture](/img/basic-architecture.png)

When a request is received, it will be routed to the respective controller that is responsible for receiving and displaying the results of the operation. The Controller will call the Service layer (business layer) that contains the logic. When an operation requires interaction with the database, it will use the Model that contains data model definition and operations.

![Architecture](/img/architecture.png)

The user class is responsible for the creation and authentication of users.

The program class is responsible for interacting with the TCP Server that communicates with the car.

## Prerequisite

### Setting up MongoDB Database

[Great Guide on setting up a local MongoDB](https://www.prisma.io/dataguide/mongodb/setting-up-a-local-mongodb-database)

### Configure Database URI

#### Lazy Way - Configure the URI inside config.js (Not the config.js within client).

[config/config.js](https://github.com/ICT2x01-P4-7/ICT2x01-P4-7-ICT2x01-p4-7/blob/main/src/config/config.js)

```js

> Alert, Do not commit config.js if you make this change!
module.exports = {
  /* Currently using localhost for default mongoUri, delete localhost mongoUri and uncomment the mongoUri below it to use Cloud MongoDB URI */
  mongoUri: "mongodb://localhost:27017/tileup",
  //mongoUri: "mongodb+srv://fake:morefake@tileup.123fa.mongodb.net/tileup?"

  /* For test database, change the default to localhost
   *  do not include the database name "tileup" after the port `27017/`
   */
  testMongoUri:"mongodb://localhost:27017/"
  ...
}
```

#### Alternative way that is a little harder, requires more effort, but more convenient!

> No change is required in config.js. Add the variable into your terminal zsh/bash profile.

```bash
# Example for Windows Bash

code ~/.bash_profile

# Add the following code
## Local
export MONGO_URI="mongodb://localhost:27017/tileup"
## or Remote Atlas
export MONGO_URI="mongodb+srv://fake:morefake@tileup.123fa.mongodb.net/tileup?"

## Local testing db. Do not include database name after /
export TEST_MONGO_URI="mongodb://localhost:27017/"

# Restart terminal!
```

# How to run

## Install dependencies

```bash
/* clone the repository */
git clone git@github.com:ICT2x01-P4-7/ICT2x01-P4-7-ICT2x01-p4-7.git tileup

/* Change dir into src*/
cd tileup/src
npm install

```

### Run Backend server

```bash
/* Change dir into src/ */
cd src/

/* Commandto run frontend */
npm run client

/* Open a new terminal*/
/* Command to run backend */
npm run server

/* For running both at the same time in the same terminal*/
npm run dev

```

![Express Backend](/img/express-backend.png)

![Express Frontend](/img/vue-frontend.png)

# Development Workflow

Branches

1. Main

2. Develop

3. Feature branch

   > All developers will work on their own dedicated branches that is based on the **development** branch.

```bash
git checkout development

git checkout -b feature/new-button development

git commit -am 'Add a new play button at login page'

git push --set-upstream origin feature/new-button


/* Continue working on the branch */
git commit -m 'add new button'
git push
git commit -m 'styling the button'
git push
git commit -m 'add logic to the button'
git push

/* Ready for review */

Create push request on Github, assign a reviewer(Leader).

The PR will be allowed to merge once it is approved.

Wew!

```

### Limitations

> Only the leader can merge the **development** branch to main
> No pushing changes to main. Only merge is allowed. Branch protection is enabled.

## Postman Collection for testing the backend API

- Download the postman collection to try out the APIs available.

> Take note: Some API requires logging in first to be able to call the API.
>
> Send the Login request first, then try the others. It will automatically update the authorization variable and allow access to the API

[![Run in Postman](https://run.pstmn.io/button.svg)](https://app.getpostman.com/run-collection/54010551dd3d1ae90e8e?action=collection%2Fimport)

# User Acceptance Testing

- An embedded video that runs through all system test cases created and refined from M2
- ~3 mins long to cover all system Tests

# Whitebox Testing

The tool used for testing is Jest. Statistics are generated with Jest, the full report can be found in [Coverage Report]('Test').

[mockingoose](https://github.com/alonronin/mockingoose) is used to mock the mongoose model.

## How to run tests

```bash
# Run the tests - Note that this will run ALL the tests in backend.
npm run test

# Generate the coverage report for backend.
npm run test-coverage
# Generated report can be found in coverage/lcov-report/index.html

```

The chosen class is User Service class. It handles the logic for user authentication.

## User Service

The tests can be found in [User Service Tests](https://github.com/ICT2x01-P4-7/ICT2x01-P4-7-ICT2x01-p4-7/blob/develop/src/services/__tests__/user_service.test.js).

The statistics after running all the test case. The breakdown into the test cases can be found below.

![User Service Tests](/img/tests/user-service-test-stats.png)

```bash
npm run test user_service.test.js
```

#### Running the test

![User Service Tests](/img/tests/user-service-run.gif)

### Test cases

![User Service Tests](/img/tests/user-service-test.png)

The tests are further isolated using Jest Filters.

```bash
npm run test 'user_service.test.js' -t 'UserService test'
```

[Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner) extension is used to help run the tests, as it helps to filter to a single test case.

### Create User

![Create User](/img/tests/create-user.png)

#### Success

- Valid PIN

  ![Valid PIN](/img/tests/create-user-valid-pin.png)

#### Error

- Invalid PIN

  ![Invalid PIN](/img/tests/create-user-invalid-pin.png)

- Non-matching PIN

  ![Non-matching PIN](/img/tests/create-user-non-matching-pin.png)

- Weak PIN

  ![Weak PIN](/img/tests/create-user-weak-pin.png)

- Existing User

  ![Existing User](/img/tests/create-user-another-user-exist.png)

### Login

![Login](/img/tests/login.png)

#### Success

- Successful login

  ![Login Success](/img/tests/login-success.png)

#### Error

- No existing user

  ![Login no existing user](/img/tests/login-no-user-exist.png)

- Wrong PIN

  ![Wrong PIN](/img/tests/login-wrong-pin.png)

- No login attempts left

  ![No login attempts left](/img/tests/login-no-attempts-left.png)

- Exceed login attempts

  ![Exceed attempts](/img/tests/login-exceed-attempts.png)

### Reset PIN

![Reset PIN](/img/tests/reset.png)

#### Success

- Successfully Reset

  ![Reset PIN success](/img/tests/reset-success.png)

#### Error

- No user exist

  ![No user exist](/img/tests/reset-no-user-exist.png)

- Missing required PIN

  ![Missing required PIN](/img/tests/reset-missing-pin.png)

- New PIN do not match confirmation PIN

  ![PIN do not match](/img/tests/reset-no-match.png)

- Incorrect current PIN

  ![Current PIN incorrect](/img/tests/reset-current-pin-incorrect.png)

- PIN is not a Number

  ![PIN is NaN](/img/tests/reset-pin-nan.png)

- Weak PIN

  ![Weak PIN](/img/tests/reset-weak-pin.png)

## Additional Tests

### User Model

```bash
npm run test 'user_model.test.js'
```

![User Model Tests](/img/tests/user-model-run.gif)

![User Model Tests](/img/tests/user-model-test.png)







### Additional Blackbox Testing (E2E)

[supertest](https://github.com/visionmedia/supertest) to test the HTTP endpoint.


