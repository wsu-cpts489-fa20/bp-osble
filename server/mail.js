import express from 'express';

const { Schema } = require("mongoose");
const app = express();
require('dotenv').config();

const mailboxSchema = new Schema({
    id: String, // unique identifier
    subject: String,
    senderId: String,
    recId: String,
    date: Date,
    message: String
    
    
                // CourseName
                                //assignment -> [status: submitted
                                                 //grade: null]
                                                 //submission: 
  })

  // Post to target inbox
app.post('/mail/:userId-:recId', async (req, res, next) => {
    console.log("in /mail (POST) route with params = " +
      JSON.stringify(req.params) + " and body = " +
      JSON.stringify(req.body));
    if (!req.body.hasOwnProperty("date") ||
      !req.body.hasOwnProperty("senderId") ||
      !req.body.hasOwnProperty("recId") ||
      !req.body.hasOwnProperty("message") 
      ) {
      //Body does not contain correct properties
      return res.status(400).send("POST request on /rounds formulated incorrectly." +
        "Body must contain all 8 required fields: date, course, type, holes, strokes, " + "minutes, seconds, notes.");
    }
  
  
    // Post to recipeients mailbox
    try {
        let status = await User.updateOne(
          { id: req.params.recId },
          { $push: { inbox: req.body } });
        if (status.nModified != 1) { //Should never happen!
          res.status(400).send("Unexpected error occurred when adding message to" +
            " database. message was not added.");
        } else {
          res.status(200).send("Message successfully added to database.");
        }
      } catch (err) {
        console.log(err);
        return res.status(400).send("Unexpected error occurred when adding message" +
          " to database: " + err);
      }
  });
  
  // Post to User outbox
  app.post('/mail/:userId', async (req, res, next) => {
    console.log("in /mail (POST) route with params = " +
      JSON.stringify(req.params) + " and body = " +
      JSON.stringify(req.body));
    if (!req.body.hasOwnProperty("date") ||
      !req.body.hasOwnProperty("senderId") ||
      !req.body.hasOwnProperty("recId") ||
      !req.body.hasOwnProperty("message") 
      ) {
      //Body does not contain correct properties
      return res.status(400).send("POST request on /rounds formulated incorrectly." +
        "Body must contain all 8 required fields: date, course, type, holes, strokes, " + "minutes, seconds, notes.");
    }
  
  
    // Post to recipeients mailbox
    try {
        let status = await User.updateOne(
          { id: req.params.recId },
          { $push: { outbox: req.body } });
        if (status.nModified != 1) { //Should never happen!
          res.status(400).send("Unexpected error occurred when adding message to" +
            " database. message was not added.");
        } else {
          res.status(200).send("Message successfully added to database.");
        }
      } catch (err) {
        console.log(err);
        return res.status(400).send("Unexpected error occurred when adding message" +
          " to database: " + err);
      }
  });
  
  app.delete('/mail/:userId/inbox/:mailId', async (req, res, next) => {
    console.log("in /rounds (DELETE) route with params = " +
      JSON.stringify(req.params));
    try {
      let status = await User.updateOne(
        { id: req.params.userId },
        { $pull: { inbox: { _id: mongoose.Types.ObjectId(req.params.roundId) } } });
      if (status.nModified != 1) { //Should never happen!
        res.status(400).send("Unexpected error occurred when deleting round from database. Round was not deleted.");
      } else {
        res.status(200).send("Round successfully deleted from database.");
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send("Unexpected error occurred when deleting round from database: " + err);
  
    }
  });
  
  app.delete('/mail/:userId/outbox/:mailId', async (req, res, next) => {
    console.log("in /rounds (DELETE) route with params = " +
      JSON.stringify(req.params));
    try {
      let status = await User.updateOne(
        { id: req.params.userId },
        { $pull: { outbox: { _id: mongoose.Types.ObjectId(req.params.roundId) } } });
      if (status.nModified != 1) { //Should never happen!
        res.status(400).send("Unexpected error occurred when deleting round from database. Round was not deleted.");
      } else {
        res.status(200).send("Round successfully deleted from database.");
      }
    } catch (err) {
      console.log(err);
      return res.status(400).send("Unexpected error occurred when deleting round from database: " + err);
  
    }
  });