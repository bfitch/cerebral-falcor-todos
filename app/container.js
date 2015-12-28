import React from 'react';

const Container = React.createClass({
  displayName: 'CerebralContainer',
  childContextTypes: {
    controller: React.PropTypes.object.isRequired
  },
  componentDidMount: function () {
    this.props.controller.devtools.start();
  },
  getChildContext: function () {
    return {
      controller: this.props.controller,
    }
  },
  render: function () {
    return this.props.app ? React.createElement(this.props.app) : this.props.children;
  }
});

export {Container};
