require("dotenv").config();
const http = require("http");

const app = require("./app");
const { SERVER_PORT } = require("./configs");
const intiateMongoose = require("./mongoose");

const PORT = SERVER_PORT || 8000;

const server = http.createServer(app);

async function startServer() {
  await intiateMongoose();
  server.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
}

startServer();
