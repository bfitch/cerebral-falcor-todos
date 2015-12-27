import React from 'react';

const QueriesMixin = {
  contextTypes: {
    queries: React.PropTypes.array
  },

  componentWillMount() {
    this.context.queries = this.context.queries.concat(this.queries());
  }
};

export default QueriesMixin;
