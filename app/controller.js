import Controller from 'cerebral';
import Model from 'cerebral-baobab';
import expandCache from 'falcor-expand-cache';
import diff        from 'deep-diff';

const model = Model({});

const falcorModel = new falcor.Model({
  source: new falcor.HttpDataSource('/model.json')
});

falcorModel._root.onChange = function() {
  const falcorCache   = expandCache(falcorModel.getCache());
  const falcorChanges = diff(model.tree.get(), falcorCache);
  falcorChanges.forEach(change => model.tree.set(change.path, change.rhs));
}

export default Controller(model, {model: falcorModel});
