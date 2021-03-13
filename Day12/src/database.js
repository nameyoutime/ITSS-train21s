const Item = require("./models/item.model");

class Database {
  constructor() {
    this.items = [];
    this.cart = [];
  }

  /**
   *
   *
   * @param {Item} item
   */
  createItem(item) {
    this.items.push(item);
  }

  /**
   *
   *
   *
   * @return {Array<Item>}
   */
  getAllItem() {
    return this.items;
  }
  /**
   *
   * @param {String} id
   * @returns {Item} found item
   */
  getItemById(id) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].id == id) {
        return this.items[i];
      }
    }
  }
}

module.exports = Database;
