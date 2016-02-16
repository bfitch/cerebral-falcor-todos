import {without} from 'lodash';
import falcorPathSyntax from 'falcor-path-syntax';

import {generateQueryPath} from '../misc/utils'
import alias from '../misc/alias'

export default function replaceQueries({input,state,modules}) {
  const falcorModule = modules[alias];
  const queriesState = state.select([...falcorModule.path, 'queries']);
  const {oldGuid,nextQueryInfo} = input;

  queriesState.unset(oldGuid);
  const convertedToPathSets = nextQueryInfo.queries.map(falcorPathSyntax.fromPath);
  queriesState.set(nextQueryInfo.guid,convertedToPathSets);
}