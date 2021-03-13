const app = require("./server");
const config = require("./config");
const Database = require("./database");
const { instance } = require("./database");
const db = new Database();

let connectionString =
  "mongodb+srv://admin:admin@cluster0.yhduf.mongodb.net/tododb?retryWrites=true&w=majority";

async function main() {
  try {
    await instance.connectToDb(connectionString);
    app.listen(config.PORT, config.HOST, () => {
      console.log(`server is running on ${config.HOST}:${config.PORT}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();
