import React from 'react';

const Container = React.createClass({
  displayName: 'CerebralContainer',
  childContextTypes: {
    controller: React.PropTypes.object.isRequired,
    falcorModel: React.PropTypes.instanceOf(falcor.Model),
    queries: React.PropTypes.array
  },
  componentDidMount: function () {
    this.props.controller.devtools.start();
  },
  getChildContext: function () {
    return {
      controller: this.props.controller,
      falcorModel: this.props.falcorModel,
      queries: []
    }
  },
  render: function () {
    return this.props.app ? React.createElement(this.props.app) : this.props.children;
  }
});

export {Container};
