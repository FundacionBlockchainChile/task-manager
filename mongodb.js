// THIS FILE CONNECT DATABASE AND WAS DELETED BY INSTRUCTOR....

// const { MongoClient, ObjectID } = require("mongodb");

// const connectionURL = "mongodb://127.0.0.1:27017";
// const databaseName = "task-manager";

// MongoClient.connect(
//   connectionURL,
//   { useNewUrlParser: true },
//   (error, client) => {
//     if (error) {
//       return console.log("Unable o connect to databes!");
//     }

//     const db = client.db(databaseName);    
//   }
// );


















// CRUD create read update delete
// NODE JS Documentation: http://mongodb.github.io/node-mongodb-native/3.1/api/

// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;
// const ObjectID = mongodb.ObjectID;

// const { MongoClient, ObjectID } = require("mongodb");

// const connectionURL = "mongodb://127.0.0.1:27017";
// const databaseName = "task-manager";

// const id = new ObjectID()
// console.log(id.id.length)
// console.log(id.toHexString().length)

// MongoClient.connect(
//   connectionURL,
//   { useNewUrlParser: true },
//   (error, client) => {
//     if (error) {
//       return console.log("Unable o connect to databes!");
//     }

//     const db = client.db(databaseName);

// READ *********************************************************

// FIND ONE OBJECT
// db.collection("users").findOne(
//   { _id: new ObjectID("5e60f8c176d23d3fd04588dd") }, (error, user) => {
//     if (error) {
//       return console.log("Unable to Fetch...");
//     }
//     console.log(user);
//   }
// );

// FIND AN OBJECT BY HIS ID FORM TASK COLLECTION
// db.collection("tasks").findOne(
//   { _id: new ObjectID("5e60f1e7801df828889e1fd0") }, (error, task) => {
//     if (error) {
//       return console.log("Unable to Fetch...");
//     }
//     console.log(task);
//   }
// );

// FIND ARRAY OF OBJECTS
// db.collection('users').find({ age: 8}).toArray((error, users) => {
//     console.log(users)
// })

// // COUNT NUMBER OF OBJECTS FINDED
// db.collection('users').find({ age: 8}).count((error, count) => {
//     console.log(count)
// })

// FIND ARRAY OF OBJECT FORM TASKS COLLECTION
// db.collection('tasks').find({ completed: false }).toArray((error, tasks) => {
//     console.log(tasks)
// })

// CREATE *********************************************************

// INSERT ONE ITEM TO DB COLLECTION.....
// db.collection("users").insertOne(
//   {
//     name: "Rocko",
//     age: 8
//   },
//   (error, result) => {
//     if (error) {
//       return console.log("Unable to insert user");
//     }

//     console.log(result.ops);
//   }
// );

// INSERT MANY ITEM TO DB COLLECTION.....
// db.collection("users").insertMany(
//   [
//     {
//       name: "Flaco",
//       age: 12
//     },
//     {
//       name: "FoxthDog",
//       age: 10
//     }
//   ],
//   (error, result) => {
//     if (error) {
//       return console.log("Unable to insert documents...");
//     }

//     console.log(result.ops);
//   }
// );

// INSERT MANY ITEM TO A NEW DB COLLECTION.....
// db.collection("tasks").insertMany(
//   [
//     {
//       name: "Comprar Toner",
//       completed: false
//     },
//     {
//       name: "Ir al Gym",
//       completed: true
//     },
//     {
//       name: "Corregir Obs. El Verones",
//       completed: false
//     }
//   ],
//   (error, result) => {
//     if (error) {
//       return console.log("Unable to insert tasks...");
//     }

//     console.log(result.ops);
//   }
// );
//   }
// );

// UPDATE *********************************************************

    // db.collection('users').updateOne({
    //   _id: new ObjectID('5e605e3bd4ccd145f87d386d')
    // }, {
    //   $inc: {
    //     age: 1
    //   }
    // }).then((result) => {
    //   console.log(result)
    // }).catch((error) => {
    //   console.log(error)
    // })

    // db.collection("tasks").updateMany(
    //     {
    //       completed: false
    //     },{
    //       $set: {
    //         completed: true
    //       }
    //     }).then(result => {
    //       console.log(result);
    //     }).catch(error => {
    //       console.log(error);
    //   });


// DELETE *********************************************************

    // DELETE MANY OBJECTS FROM A COLLECTION

    // db.collection('users').deleteMany(
    //   { age: 8 }
    // ).then((result) => {
    //   console.log(result)
    // }).catch((error) => {
    //   console.log(error)
    // })

    // DELETE ONE OBJECT FROM A 'tasks' COLLECTION

    // db.collection('tasks').deleteOne(
    //   { name: 'Comprar Toner' }
    // ).then((result) => {
    //   console.log(result)
    // }).catch((error) => {
    //   console.log(error)
    // })