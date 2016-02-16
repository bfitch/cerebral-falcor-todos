import falcorPathSyntax from 'falcor-path-syntax';

export function generateQueryPath(query){
  const pathSet = falcorPathSyntax.fromPath(query);
  const queryString = JSON.stringify(pathSet);
  const queryPath = ['queries', queryString];
  return queryPath;
}

