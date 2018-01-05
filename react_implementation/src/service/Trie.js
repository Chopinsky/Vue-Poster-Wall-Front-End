export default class Trie {
  constructor() {
    this.value = "";
    this._children = {};
  }

  addChild(key, child) {
    if (key && child) {
      this._children[key] = child;
    }
  }

  getChild(key) {
    if (key && this._children.hasOwnProperty(key)) {
      return this._children[key];
    }

    return null;
  }

  collect() {
    let result = [];

    if (this.value) {
      result.push(this.value);
    }

    for (const key in this._children) {
      if (this._children.hasOwnProperty(key)) {
        const childCollection = this._children[key].collect();
        if (childCollection && childCollection.length > 0) {
          result.push(...childCollection);
        }
      }
    }

    return result;
  }

  collectWithLimit(count, limit) {
    let result = [];
    limit = limit < 5 ? 5 : limit;

    if (this.value) {
      result.push(this.value);
      count += 1;
    }
    
    for (const key in this._children) {
      if (this._children.hasOwnProperty(key)) {
        const childCollection = this._children[key].collectWithLimit(count, limit);
        
        if (count + childCollection.length > limit) {
          result.push(...childCollection.slice(0, limit - count));
          break;
        } else if (childCollection && childCollection.length > 0) {
          result.push(...childCollection);
          count += childCollection.length;
        }
      }
    }

    return result;
  }
}