import falcor from 'falcor';
import HTTPDataSource from 'falcor-http-datasource';

export default (options = {}) => {
  return (module) => {
    module.alias('cerebral-module-falcor');

    const source      = new HTTPDataSource('/model.json');
    const falcorModel = new falcor.Model({source});

    module.services({
      get(query) {
        return falcorModel.get(query)
      },
      set(jsonGraph){
        return falcorModel.set(jsonGraph);
      },
      call(functionPath, args = [], refSuffixes = [], thisPaths = []) {
        // functionPath - {Path}            the path to the function to invoke
        // args         - {Array.<Object>}  the arguments to pass to the function
        // refSuffixes  - {Array.<PathSet>} paths to retrieve from the targets of JSONGraph References in the function's response.
        // thisPaths    - {Array.<PathSet>} paths to retrieve from function's this object after successful function execution
        return falcorModel.call(functionPath, args, refSuffixes, thisPaths);
      }
    });
  }
}
