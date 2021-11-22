# ICT2x01-P4-7 TileUp!

TileUp is a gamified web portal for controlling MSP432 robotic car.

# Prerequisite

- npm version >6.14

# How it works

The project contains a Nodejs backend and a VueJS frontend.
The backend is in `src/`. The frontend is nested within the backend directory `src/client`.

# How to run

## Install dependencies

```bash
/* Change dir into backend src/ */
cd src/
npm install

/* Change dir into frontend */
cd client
npm install

```

### Run Backend server

```bash
/* Assuming root directory */
/* Change dir into backend src/ */
cd src/

/* Run script to run both backend */
npm run server

```

![Express Backend](/img/express-backend.png)

### Run Frontend server

```bash
/* Assuming root directory */
/* Change dir into client directory(frontend) */
cd src/client

/* Run script to run both backend and frontend together */
npm run serve

```

![Express Backend](/img/vue-frontend.png)

> It is also possible to serve the client server from the backend directory for convenience.
>
> `npm run client`

### Alternatively, to run both at the same time.

> Note that this method makes it hard to see when errors appear in either backend or frontend

```bash
/* Change dir to backend */
cd src/

/* Run script to run both backend and frontend together */
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
>
> No pushing changes to main. Only merge is allowed. Branch protection is enabled.

# User Acceptance Testing

- An embedded video that runs through all system test cases created and refined from M2
- ~3 mins long to cover all system Tests

# Whitebox Testing

- Choose one meaningful(2 or more interaction with other classes) class to demonstrate test code. E.g A control class, **Do not use entity class**
- List test cases for test suite for the selected class, and where they reside in the repository
- Show code coverage statistics for each test case, including an explanation of how we generated the statistics - via library, manual, or via IDE
- Provide instructions on how to run test suite
- Embed an animated gif or another short video(~1 min) of test case being ran.
