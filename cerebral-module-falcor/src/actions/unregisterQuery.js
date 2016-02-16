import {isNull,flatten} from 'lodash'
import {generateQueryPath} from '../misc/utils'
import alias from '../misc/alias'

export default function unregisterQuery({input,modules,state}){
  const {guid} = input;
  const falcorModule = modules[alias];
  const queriesState = state.select([...falcorModule.path,'queries']);
  queriesState.unset(guid);
}