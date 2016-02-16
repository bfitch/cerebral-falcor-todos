import React from 'react';
import falcorPathSyntax from 'falcor-path-syntax';
import falcorPathUtils from 'falcor-path-utils';
import {isFunction,get,isEqual} from 'lodash';
import {v4 as uuid} from 'uuid';
import alias from '../../misc/alias';

export default function Decorator(decoratorProps) {
  return function (Component) {
    return React.createClass({
      contextTypes: {
        controller: React.PropTypes.object
      },
      componentWillMount() {
        const {controller} = this.context;
        controller.on('change', this.update);

        const isArr = Array.isArray(decoratorProps);
        const isFunc = isFunction(decoratorProps);

        if (!isArr && !isFunc) {
          throw new Error(`Falcor decorator must be passed an array of queries or a function producing such an array. Query ${JSON.stringify(decoratorProps, null, 2)}.`);
        }

        const guid = uuid();
        const queries = (isFunc ? decoratorProps(this.props) : decoratorProps).sort();
        const queryInfo = {guid, queries};

        const {registerQuery,batchQuery} = this.getFalcorSignals();
        registerQuery(queryInfo);
        batchQuery();

        this.queryInfo = queryInfo;
        this.setState({
          falcor: (jsonPath = '', defaultValue) => defaultValue,
          queryInfo
        });
      },
      componentWillUpdate(nextProps, nextState){
        const oldQueries = get(this, 'queryInfo.queries', null);
        const nextQueries = (isFunction(decoratorProps) ? decoratorProps(nextProps) : decoratorProps).sort();

        if (!isEqual(oldQueries, nextQueries)) {
          const newQueryInfo = {
            guid: uuid(),
            queries: nextQueries
          };

          const {replaceQueries} = this.getFalcorSignals();

          replaceQueries({
            oldGuid: this.queryInfo.guid,
            nextQueryInfo: newQueryInfo
          });

          this.queryInfo = newQueryInfo;
        }
      },
      componentWillUnmount(){
        const {controller} = this.context;
        const guid = get(this, 'queryInfo.guid', null);

        if (guid) {
          const {unregisterQuery} = this.getFalcorSignals();
          unregisterQuery({guid});
          this.queryInfo = undefined;
        }
        controller.removeListener('change', this.update);
      },
      getFalcorSignals(){
        const {path} = this.context.controller.getModules()[alias];
        const signals = path.reduce((signal, key) => signal[key], this.props.signals);
        return signals;
      },
      update() {
        if (this.isMounted()) {
          const {controller} = this.context;
          const moduleName = controller.getModules()[alias].name;
          // Check if the state you are looking for has changed and
          const json = controller.get([moduleName, 'json']);

          this.setState({
            falcor(jsonPath = '', defaultValue){
              if (!jsonPath.length) return json;
              return get(json || {}, jsonPath, defaultValue);
            }
          });
        }
      },
      render: function () {
        const propsToPass = Object.assign({}, this.props || {}, this.state || {});// Create a function that merges this.props and this.state (where you put whatever is grabbed from controller)
        return React.createElement(Component, propsToPass);
      }
    });
  }
}