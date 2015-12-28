import expand from 'falcor-expand-cache';
import dif    from 'deep-diff';

function falcorService(model, expandCache = expand, diff = dif) {
  const falcorModel = new falcor.Model({
    source: new falcor.HttpDataSource('/model.json')
  });
  // const falcorModel = _falcorModel.batch(1000);

  falcorModel._root.onChange = function() {
    const falcorCache   = expandCache(falcorModel.getCache());
    const falcorChanges = diff(model.tree.get(), falcorCache);
    falcorChanges.forEach(change => model.tree.set(change.path, change.rhs));
  }

  return {
    get: function(query) {
      const get = (input, state, output, services) => {
        return falcorModel.get(query).
          then(response => output()).
          catch(response => { debugger });
      }
      get.displayName = 'get';
      return get;
    },
    call: function(path, key, attrs) {
      const call = (input, state, output, services) => {
        return falcorModel.call(path, [input[key]], attrs).
          then(response => output()).
          catch(response => { debugger });
      }
      call.displayName = 'call';
      return call;
    },
    falcorGet: function(query) { return falcorModel.get(query) }
  };
}

export default falcorService;
