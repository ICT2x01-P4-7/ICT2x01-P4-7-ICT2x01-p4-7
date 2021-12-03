# ICT2x01-P4-7 TileUp!

TileUp is a gamified web portal for controlling MSP432 robotic car.

# Prerequisite

- npm version >6.14

# How it works

The project is using the MEVN Stack. MongoDB(M), ExpressJS(E) , VueJS(V), NodeJS(N).

Monorepo containing both the frontend and backend. The backend is in `src/`. The backend consist of MongoDB, ExpressJS and NodeJS
The VueJS frontend is nested within the backend directory `src/client`.

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

/* Script to run frontend */
npm run client

/* Script to run backend */
npm run server

```

![Express Backend](/img/express-backend.png)

![Express Frontend](/img/vue-frontend.png)

### Alternatively, to run both in the same terminal.

> Note that this method makes it hard to see when errors appear in either backend or frontend

```bash
npm run dev
```

# Development Workflow

Branches

1. Main
2. Develop
3. Feature branch
4. Hotfix branch

All developers will work on their own dedicated branches that is based on the **development** branch.

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

# How to run tests

```bash
# Run the tests
npm run test

# Generate the coverage report
npm run test-coverage
# It can be found in coverage/lcov-report/index.html

```

- Choose one meaningful(2 or more interaction with other classes) class to demonstrate test code. E.g A control class, **Do not use entity class**
- List test cases for test suite for the selected class, and where they reside in the repository
- Show code coverage statistics for each test case, including an explanation of how we generated the statistics - via library, manual, or via IDE
- Provide instructions on how to run test suite
- Embed an animated gif or another short video(~1 min) of test case being ran.
