import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Image, Dimmer, Loader} from 'semantic-ui-react';
import Waypoint from 'react-waypoint';

export default class GiphyImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      inViewPort: false
    };

    this.handleImageLoaded = this.handleImageLoaded.bind(this);
    this.handleWaypointEnter = this.handleWaypointEnter.bind(this);
  }

  handleImageLoaded() {
    this.setState({loaded: true});
  }

  handleWaypointEnter() {
    this.setState({inViewPort: true});
  }

  handleWaypointLeave() {
    this.setState({inViewPort: false});
  }

  render() {
    const options = {active: !this.state.loaded};

    return (
      <Waypoint
        onEnter={this.handleWaypointEnter}
        onLeave={this.handleWaypointLeave}
      >
        <div>
          <Dimmer {...options}>
            <Loader />
          </Dimmer>
          {this.state.inViewPort &&
            <Image
              src={this.props.gif.images.original.gif_url}
              alt={this.props.gif.title}
              label={this.props.gif.title}
              width={this.props.gif.images.original.width}
              height={this.props.gif.images.original.height}
              onLoad={this.handleImageLoaded}
            />
          }
        </div>
      </Waypoint>
    );
  }
}

GiphyImage.propTypes = {
  gif: PropTypes.shape({
    title: PropTypes.string,
    images: PropTypes.shape({
      original: PropTypes.shape({
        gif_url: PropTypes.string,
        width: PropTypes.string,
        height: PropTypes.string
      })
    })
  })
};

GiphyImage.defaultProps = {
  gif: {}
};
