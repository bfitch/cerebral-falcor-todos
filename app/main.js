import React from 'react';
import ReactDOM from 'react-dom';
import controller from './controller';
import {Container} from './container';
import App from './app';
import cache from './falcor_cache';

const model = new falcor.Model({
  // cache: cache,
  onChange: function(x) {
    console.log('change');
  },
  source: new falcor.HttpDataSource('/model.json')
});

const getTodosLength = (input, state, output) => {
  model.
    get(['todos', 'length']).
    then((response) => {
      output({todosLength: response.json.todos});
    });
}

const getTodos = (input, state, output) => {
  const length = state.get('todosLength');

  model.
    get(['todos', {from: 0, to: 1}, 'title']).
    then((response) => {
      output({todos: response.json.todos});
    }).
    catch((response) => {
      debugger
    });
}

const createTodo = (input, state, output) => {
  const length = state.get('todosLength');

  model.set(falcor.pathValue(['todosById', 'title'], input.title)).
    then((response) => {
      output();
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

controller.signal('todoTextEntered', [
  [createTodo],
  (input, state) => {
    const todo = { 3: { title: input.title } }
    state.merge('todos', todo);
  }
]);

ReactDOM.render(
  <Container controller={controller} falcor={model}><App/></Container>,
  document.getElementById('root')
);
