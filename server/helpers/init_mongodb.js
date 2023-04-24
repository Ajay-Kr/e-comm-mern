const mongoose = require('mongoose');

mongoose.connect(
  process.env.MONGODB_URI,
  {
    dbName: process.env.DB_NAME
  }
).then(() => {
  console.log('MongoDB connected...');
}).catch((err) => {
  console.log(err.message);
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to db...');
});

mongoose.connection.on('error', (err) => {
  console.log(err.message);
});

mongoose.connection.on('disconnect', () => {
  console.log('Mongoose connection is terminated...');
});

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit(0);
});