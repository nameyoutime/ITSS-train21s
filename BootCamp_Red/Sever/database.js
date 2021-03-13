const mongoose = require("mongoose");
const birdSchema = require("./Schemas/Bird.schema");

class Database {
  constructor() {
    this.Bird = mongoose.model("Bird", birdSchema);
  }
  static sin = null;
  /**
   * @returns {Database}
   */
  static get instance() {
    if (this.sin == null) {
      this.sin = new Database();
    }
    return this.sin;
  }

  /**
   * @returns {Promise<mongoose.Connection>}
   */
  async connectDb(connectionString) {
    return new Promise((resolve, reject) => {
      mongoose.connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      const db = mongoose.connection;
      db.on("error", (err) => {
        reject("error");
      }),
        db.once("open", () => {
          console.log("Connect successfully");
          resolve(db);
        });
    });
  }
  async createBird(newBird) {
    //    return await this.Bird.create({
    //        name: name,
    //        img: img
    //    });
    return await this.Bird.create(newBird);
  }
}

module.exports = Database;
