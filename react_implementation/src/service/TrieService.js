import Trie from './Trie';

const root = new Trie();

export function find(str) {
  if (typeof str !== 'string' || str.length === 0) {
    return [""];
  }

  var node = root;
  var index = 0;

  while (index < str.length && node) {
    var key = str.charAt(index);
    childNode = node.getChild(key);
    
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

export function insert(str) {
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

export function getTrie() {
  return root;
}

export function clearTrie() {
  root = new Trie();
}