export default class Trie {
  constructor(key, value) {
    this._value =value;
    this._key = key;
    this._children = [];
  }

  get value() {
    return this._value;
  }

  set value(val) {
    throw Error("Trie node's stored value can not be changed");
  }

  get key() {
    return this._key;
  }

  set key() {
    throw Error("Trie node's stored key can not be changed");
  }

  addChild(child) {

  }

  collect() {
    let result = [];

    if (this._value) {
      result.push(this._value);
    }

    this._children.forEach((child) => {
      let childCollection = child.collect();
      if (childCollection && childCollection.length > 0) {
        result.push(...childCollection);
      }
    });

    return result;
  }

  collectWithLimit(count, limit) {
    let result = [];
    limit = limit < 5 ? 5 : limit;

    if (this._value) {
      result.push(this._value);
      count += 1;
    }
    
    let index = 0;
    while(count < limit && index < this._children.length) {
      let childCollection = this._children[index].collectWithLimit(count, limit);

      if (count + childCollection.length > limit) {
        result.push(...childCollection.slice(0, limit - count));
        break;
      } else {
        result.push(...childCollection);
        count += childCollection.length;
      }

      index += 1;
    }

    return result;
  }
}