import Trie from './Trie';

const findInTrie = (root, str) => {
  if (typeof str !== 'string' || str.length === 0) {
    return [""];
  }

  var node = root;
  var index = 0;

  while (index < str.length && node) {
    var key = str.charAt(index);
    var childNode = node.getChild(key);
    
    if (childNode) {
      node = childNode;
    } else {
      // if has found at least 1 character matching, return child collection; 
      // otherwise, return no finding;
      return (index > 0) ? node.collect() : [""];
    }

    index += 1
  }

  return [...node.collect()];
}

const insertToTrie = (root, str) => {
  if (typeof str !== 'string' || str.length === 0) {
    return;
  }

  var node = root, childNode = null;
  var index = 0;

  while (index < str.length) {
    var key = str.charAt(index);
    childNode = node.getChild(key);

    if (!childNode) {
      // node not yet in the Trie yet, create a new node and 
      // add it to the Trie.
      childNode = new Trie();
      node.addChild(key, childNode);
    }

    node = childNode;
    index += 1;
  }

  node.value = str;
}

export default class TrieService {
  constructor() {
    this.root = new Trie();
  }

  suggest = (str) => {
    if (!this.root) {
      return [];
    }

    return findInTrie(this.root, str);
  }

  insert = (str) => {
    if (!this.root) {
      this.root = new Trie();
    }

    insertToTrie(this.root, str);
  }

  reset = () => {
    this.root = new Trie();
  }
}

function permuteAbstract(arr, n) {
  if (n === 0) {
    console.log(arr);
  } else {
    for (var i = 0; i <= n; i++) {
      permuteAbstract(arr, n-1);
      swap(arr, n % 2 === 0 ? i : 0, n);
    }
  }
}

function permuteSimple(arr, n) {
  if (n === 0) {
    console.log(arr);
  } else {
    for (let i = 0; i <= n; i++) {
      // needs to keep arr immutable so we don't have to restore it 
      // after each permute
      const carry = [...arr];
      const last = carry.splice(i, 1);
      permuteSimple([...carry, ...last], n-1);
    }
  }
}

function swap(arr, i, j) {
  var temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}