# ICT2x01-P4-7 TileUp!

TileUp is a gamified web portal for controlling MSP432 robotic car.

# Prerequisite

- npm version ?.?.?

# How it works
1. The project contains a Nodejs backend 

# How to run

1. 
2. 
3. 

# Development Workflow

Branches 

1. Main
2. Develop
3. Feature branch
4. Hotfix branch



Only the leader can merge the **development** branch to main

No pushes can be made to main.

All developers will work on their own dedicated branches that is based on **development branch**.

```bash
git checkout development

git checkout -b feature/new-button development

git commit -am 'Add a new play button at login page'

/* Continue working on the branch */

git push --set-upstream origin feature/new-button

Go to github to create push request

Reviewer(Leader) will approve.

Then PR will be allowed to merge.


```







# User Acceptance Testing

- An embedded video that runs through all system test cases created and refined from M2
- ~3 mins long to cover all system Tests

# Whitebox Testing

- Choose one meaningful(2 or more interaction with other classes) class to demonstrate test code. E.g A control class, **Do not use entity class**
- List test cases for test suite for the selected class, and where they reside in the repository
- Show code coverage statistics for each test case, including an explanation of how we generated the statistics - via library, manual, or via IDE
- Provide instructions on how to run test suite
- Embed an animated gif or another short video(~1 min) of test case being ran.
