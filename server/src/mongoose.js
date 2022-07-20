const mongoose = require("mongoose");

const { MONGO_PASSWORD } = require("./configs");

const MONGO_URL = `mongodb+srv://auth-app:${MONGO_PASSWORD}@maincluster.jrkyr.mongodb.net/demo?retryWrites=true&w=majority`;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (error) => {
  console.error(error);
});

const intiateMongoose = async () => {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = intiateMongoose;
