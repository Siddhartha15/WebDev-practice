# WEB DEV PRACTICE using Cloud9 IDE #

### Running the server on Cloud9

#####   Run `npm install` To install all dependencies from a package.json file

1) Open `server.js` or `app.js` or `index.js` and start the app by clicking on the "Run" button in the top menu.

2) Alternatively you can launch the app from the Terminal:

    ~$ node app.js

Once the server is running, open the project in the shape of 'https://projectname-username.c9users.io/'. As you enter your name, watch the Users list (on the left) update. Once you press Enter or Send, the message is shared with all connected clients.

3) For DataBase configuration in Cloud9

> You should now have mongo 3.6.2 or newer, you can double check with `mongo --version`
>
> Now type `cd` in the terminal and hit enter to go into the root directory `~`
Enter the following:
     
     ~$ mkdir data
     ~$ echo "mongod --dbpath=data --nojournal" > mongod
     ~$ chmod a+x mongod
> Now, in order to run mongod you'll first need to cd into root `~` then run `./mongod` 


#### Cloud9 projects or workspace migrated to AWS Cloud9 (since Amazon acquired Cloud9)
