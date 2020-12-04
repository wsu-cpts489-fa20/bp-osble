# Milestone 3 Update

This week, we focused on the server side of the appication. We seperated the
server.js into three different component which are 
course.js: https://github.com/wsu-cpts489-fa20/bp-osble/blob/master/server/course.js

mail.js: https://github.com/wsu-cpts489-fa20/bp-osble/blob/master/server/mail.js

user.js: https://github.com/wsu-cpts489-fa20/bp-osble/blob/leonard/server/user.js. 
We created a schema for each of the elements but haven't actually 
connect the backend to the frontend yet. 
We have also created two new test cases to test the dropdown menu and 
logout functionality.
Links: will be post later


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

Milestone 2 tests: https://www.dropbox.com/s/ogjuld68wowhduz/mileston2Tests.gif?dl=0
DEPLOY URL: https://osble.bfapp.org
