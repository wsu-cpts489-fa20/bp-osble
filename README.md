# Milestone 4

This week we worked a lot on both backend and frontend. We designed efficient schemas for our project
 and. After Implementing the backend, we proceed to populate the user interface with real data coming 
 from the database. Also, we adjusted our old test cases to work with the new data and created new test 
 cases for the user interface such as the administrator interface. That means we rewrote the existing test 
 cases.

DEPLOY URL: https://osble.bfapp.org

 Key features:

 * An instructor can create a course

 * If there exist a course, then the instructor can create assignments for that particular course 

 * A student can write a submission for an assignment.

 * An instructor can grade student's submission

 * Students can view their grades & Instructor can view student's grades too

 And much more ... 

To be reviewed for code quality:  https://github.com/wsu-cpts489-fa20/bp-osble/blob/milestone4/tests/bpOsbleAdminTest.js

mail.js: https://github.com/wsu-cpts489-fa20/bp-osble/blob/master/server/mail.js

user.js: https://github.com/wsu-cpts489-fa20/bp-osble/blob/leonard/server/user.js. 

Milestone 4 tests: https://youtu.be/LS0piT3dOpQ

*Gif version of video located here*: 
https://www.dropbox.com/s/d9mmx94r0nd65m5/milestone4.gif?dl=0


# Osble Web App

This repo serves as the starting code for all of the CptS 489 project teams in the
Fa20 semester. It will be pushed to their repos, deployed to their instances on
AWS EB, and served through https://[proj-name].bfapp.org.

To connect the app to your MongoDB database, create a .env file in the 
project root directory. On the first line of that file, add this:
MONGO_STR=<YOUR_MONGO_CONNECTION_STRING>

You'll should also add the client ids and client secrets of each of your 
OAuth providers to the .env file. Here's an example for GitHub:
GH_CLIENT_ID='<CLIENT ID INSIDE QUOTES>'
GH_CLIENT_SECRET='<CLIENT SECRET INSIDE QUOTES>'

Make sure to add .env to your .gitignore file so that your secrets aren't
stored in your GitHub repo!

The app is presently set be served to http://localhost:8081 through the command
npm run dev. You'll need to update DEPLOY_URL in server.js for remote deployment.

