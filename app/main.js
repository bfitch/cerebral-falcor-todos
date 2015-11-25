import React from 'react';
import ReactDOM from 'react-dom';
import controller from './controller';
import {Container} from 'cerebral-react';
import App from './app';
import cache from './falcor_cache';

const model = new falcor.Model({
  cache: cache
  // source: new falcor.HttpDataSource('/model.json')
});

const getTodosLength = (input, state, output) => {
  model.
    getValue('todos.length').
    then((response) => {
      output({todosLength: response});
    });
}

const getTodos = (input, state, output) => {
  const length = state.get('todosLength') - 1;

  model.
    get(['todos', {from: 0, to: length}, 'title']).
    then((response) => {
      output({todos: response.json.todos});
    });
}

const set = (path) => {
  function action(input, state, output) {
    state.set(path, input[path]);
  }
  action.displayName = `set(${path})`;
  return action;
}

controller.signal('appMounted', [
  [getTodosLength], set('todosLength'),
  [getTodos], set('todos')
]);

ReactDOM.render(
  <Container controller={controller}><App/></Container>,
  document.getElementById('root')
);
