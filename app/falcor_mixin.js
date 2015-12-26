import React from 'react';
let callbacks = [];
let listener = false;

const Mixin = {
  contextTypes: {
    controller: React.PropTypes.object,
    falcorModel: React.PropTypes.instanceOf(falcor.Model)
  },
  componentWillMount: function () {
    this.signals      = this.context.controller.signals;
    this.falcorModel  = this.context.falcorModel;
    this.queries      = []

    if (!this.getStatePaths) {
      return;
    }

    if (this.context.controller.isServer) {
      return this._update();
    }

    if (!listener) {
      listener = true;
      this.context.controller.on('change', () => {
        callbacks.forEach(function (cb) {
          cb();
        });
      });
    }
    callbacks.push(this._update);

    var queries  = this.getQueries ? this.getQueries() : [];
    this.queries = this.queries.concat(queries);

    this._update();
  },

  componentDidMount: function() {
    this.falcorModel.
      get(...this.getQueries()).
      then(()=>{this._update()}).
      catch(response => { debugger });
  },

  componentWillUnmount: function () {
    this._isUmounting = true;
    if (this.getStatePaths || this.getComputedPaths) {
      callbacks.splice(callbacks.indexOf(this._update), 1);
    }
  },
  shouldComponentUpdate: function (nextProps, nextState) {
    var propKeys = Object.keys(nextProps);
    var stateKeys = Object.keys(nextState);

    // props
    for (var x = 0; x < propKeys.length; x++) {
      var key = propKeys[x];
      if (this.props[key] !== nextProps[key]) {
        return true;
      }
    }

    // State
    for (var x = 0; x < stateKeys.length; x++) {
      var key = stateKeys[x];
      if (this.state[key] !== nextState[key]) {
        return true;
      }
    }

    return false;
  },
  _update: function () {
    if (this._isUmounting) {
      return;
    }
    var statePaths = this.getStatePaths ? this.getStatePaths() : {};
    var controller = this.context.controller;
    var newState = {};

    newState = Object.keys(statePaths).reduce(function (newState, key) {
      var value = controller.get(statePaths[key]);
      if (value !== undefined) {
        newState[key] = value;
      }
      return newState;
    }, newState);

    this.setState(newState);
  }
};

export {Mixin};
