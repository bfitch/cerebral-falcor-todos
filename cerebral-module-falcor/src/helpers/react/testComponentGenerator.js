import React, {Component} from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import Decorator from './decorator'

export default function TestComponentGenerator(queries,subPath='') {
  @Cerebral()
  @Decorator(queries)
  class FalcorTester extends Component {
    render() {
      const {falcor} = this.props;
      const value = falcor(subPath);

      return (
        <div>
          <h5>{`Falcor <==> Cerebral subcache`}</h5>
          <h6>{subPath.length? `Subpath:${subPath}`:`Complete`}</h6>
          <pre>{JSON.stringify(value,null,2)}</pre>
        </div>
      );
    }
  }
  return FalcorTester;
}