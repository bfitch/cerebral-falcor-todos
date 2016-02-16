import falcorPathSyntax from 'falcor-path-syntax';
import {generateQueryPath} from '../misc/utils';
import alias from '../misc/alias';

export default function registerQuery({input,state,modules}){
  const {guid,queries} = input;

  if (!Array.isArray(queries)) {
    throw new Error(`input.queries must be an array of falcor query strings.`);
  }

  const convertedToPathSets = queries.map(falcorPathSyntax.fromPath);
  const falcorModule = modules[alias];
  const queriesState = state.select([...falcorModule.path,'queries']);
  queriesState.set(guid,convertedToPathSets);
}