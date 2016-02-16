import {set,debounce} from 'cerebral-addons';
import batchQueryAsyncAction from '../actions/batchQuery';
import alias from '../misc/alias';

const batchQuery = [
  set('state:/falcor.lastUpdated',(new Date()).getTime()),
  [
    batchQueryAsyncAction,
    {
      success: [
        ({input,modules,state})=> {
          const {json,optimizedQuery} = input;
          const falcorModule = modules[alias];
          const falcorState = state.select(falcorModule.path);
          falcorState.merge({json,optimizedQuery});
        }
      ],
      error: [
        e=> {
          console.error(e);
          debugger;
        }
      ]
    }
  ]
];
export default batchQuery;