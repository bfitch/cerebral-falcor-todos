import alias from './misc/alias';
import warning from './misc/warning';

import { batchQuery,call,registerQuery,unregisterQuery, replaceQueries} from './signals';
import {initializeServices} from './services';

export default (options = {})=> {
  return (module, controller)=> {
    module.alias(alias);

    module.addState({
      lastUpdated: (new Date()).getTime(),
      json: {},
      queries: {}
    });

    module.addSignals({
      batchQuery,
      call,
      registerQuery,
      unregisterQuery,
      replaceQueries
    });

    const fullOptions = Object.assign({
      initialState: {},
      dataSource: '/model.json',
      verbose: true,
      disableTimeout: true
    }, options);

    const {falcorModel,falcorServices} = initializeServices(module, fullOptions);
    module.addServices(falcorServices);

    const meta = {warning, falcorModel};
    return meta;
  }
}