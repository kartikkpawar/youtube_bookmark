const firebase = require("firebase");

const firebaseApp = firebase.initializeApp({
  apiKey: "<your-api-key>",
  authDomain: "<your-auth-domain>",
  databaseURL: "<your-database-url>",
  storageBucket: "<your-storage-bucket-url>",
  projectId: "<your-project-id>",
});

const database = firebaseApp.firestore();

export default database;
