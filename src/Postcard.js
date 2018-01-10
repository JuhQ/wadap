import React, {Component} from 'react';
import {uniqueId, chunk, filter} from 'lodash';
import './Postcard.css';

const mapText = (text, chunkSize) => {
  const content = filter(text.toUpperCase().trim().split(''), t => t !== ' ');
  return chunk(content, chunkSize).map(c =>
    (
      <div key={uniqueId()}>
        {c.map((t, i) =>
          <span key={uniqueId()} style={{transform: `translateY(${i * -20}px)`}}>{t}</span>
        )}
      </div>
    )
  );
};

export default class Postcard extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      chunkSize: 4
    };

    this.setText = this.setText.bind(this);
    this.setChunkSize = this.setChunkSize.bind(this);
  }

  setText({target}) {
    this.setState({text: target.value});
  }

  setChunkSize({target}) {
    this.setState({chunkSize: target.value});
  }

  render() {
    return (
      <div className="Postcard">
        <input type="number" value={this.state.chunkSize} onChange={this.setChunkSize} /><br />
        <input type="text" value={this.state.text} onChange={this.setText} />
        <div className="content">{this.state.text.length > 0 && mapText(this.state.text, this.state.chunkSize)}</div>
      </div>
    );
  }
}
