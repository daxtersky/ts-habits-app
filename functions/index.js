const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info('Hello logs!', { structuredData: true });
  response.send('Hello from Firebase!');
});

exports.randomNumber = functions.https.onRequest((request, response) => {
  functions.logger.info('Random number!', { structuredData: true });
  const randomNumber = Math.floor(Math.random() * 100);
  response.send(randomNumber.toString());
});

exports.sayHello = functions.https.onCall((data, context) => {
  functions.logger.info(`SAYHELLO LOG - DATA: ${data.data} CONTEXT ${context.auth} / ${context.rawRequest}`, { structuredData: true });
  return `data ${data}, context ${context}`;
});
