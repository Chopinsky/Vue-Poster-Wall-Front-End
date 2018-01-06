import React, { Component } from 'react';

import TrieService from '../service/TrieService';

const styles = {
  symbols: {
    "margin": "10px 0"
  }
}

const entries = ['a', 'abc', 'the', 'to', 'from'];

export default class TrieSearch extends Component {
  constructor(props) {
    super(props);

    const baseTrie = new TrieService();
    entries.forEach(val => {
      baseTrie.insert(val);
    });

    this.state = {
      trie: baseTrie,
    }
  }

  render() {
    let result = this.state.trie.suggest('t');
    return (
      <div>
        {
          result.map((val, index) => {
            return <p key={index}>{val}</p>;
          })
        }
      </div>
    );
  }
}