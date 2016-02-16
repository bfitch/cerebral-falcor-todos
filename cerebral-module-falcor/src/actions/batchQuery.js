import falcorPathUtils from 'falcor-path-utils';
import alias from '../misc/alias';
import {get,values,flatten} from 'lodash'

export default async function batchQuery({input,modules,state,output}){
  try {
    const {verbose=false} = input;
    const falcorModule = modules[alias];
    const queriesState = state.select([...falcorModule.path,'queries']);
    const allQueries = flatten(values(queriesState.get()));
    const optimizedQuery = falcorPathUtils.collapse(allQueries);

    let json=null;

    if(optimizedQuery.length){
      if (verbose) console.log(`Falcor combined query: ${JSON.stringify(optimizedQuery)}`);
      const results = await falcorModule.services.get(optimizedQuery);
      json = get(results, 'json', null);
      if (!json) debugger;
    }

    output.success({json,optimizedQuery});
  }
  catch (e) {
    console.error(e);
    debugger;
    output.error(e);
  }
}