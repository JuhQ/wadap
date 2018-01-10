import React, {Component} from 'react';
import {map, uniqueId, isEqual} from 'lodash';
import {Grid} from 'semantic-ui-react';
import {search} from './models/Giphy';
import GiphyImage from './GiphyImage';

const renderGif = gif =>
  (
    <Grid.Column key={uniqueId()}>
      <GiphyImage gif={gif} />
    </Grid.Column>
  );

export default class Giphy extends Component {
  constructor() {
    super();
    this.state = {
      text: '',
      data: []
    };

    this.setText = this.setText.bind(this);
    this.search = this.search.bind(this);
  }

  setText({target}) {
    this.setState({text: target.value});
  }

  search(event) {
    event.preventDefault();
    if (this.state.text.trim().length === 0) {
      return;
    }

    search(this.state.text)
      .then(({data}) => {
        this.setState({data});
      });
  }

  renderData() {
    return (
      <Grid columns={3} divided stackable stretched>
        <Grid.Row>
          {map(this.state.data, renderGif)}
        </Grid.Row>
      </Grid>
    );
  }

  render() {
    return (
      <div className="Postcard">
        <form onSubmit={this.search}>
          <input type="text" value={this.state.text} onChange={this.setText} />
          <button type="submit">click here</button>
          {this.state.data.length > 0 && this.renderData()}
        </form>
      </div>
    );
  }
}
