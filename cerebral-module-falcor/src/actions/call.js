import alias from '../misc/alias';


export default async function call({input, output, modules}) {
  try {
    const {falcor} = input;
    const {path, args, refSuffixes = [], thisPaths = [],debug=true,verbose=true} = falcor;

    if (!path || !args) throw new Error(`Invalid falcor inputs.`);
    const arrayedArgs = Array.isArray(args) ? args : [args];
    const fullPath = Array.isArray(path) ? path : [path];

    let response = await modules[alias].services.call(
      fullPath,
      arrayedArgs,
      refSuffixes,
      thisPaths
    );

    //If your is returns just invalidations to the cache there will be a null response
    if (!response) response = {json: {}};

    if (output.success) output.success(response.json);
    else output(response.json);
  }
  catch (e) {
    if (verbose) console.error(e);
    if (debug) debugger;
    output.error(e);
  }
}