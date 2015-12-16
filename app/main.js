import React from 'react';
import ReactDOM from 'react-dom';
import controller from './controller';
import {Container} from './container';
import App from './app';
import cache from './falcor_cache';

const model = new falcor.Model({
  // cache: cache,
  source: new falcor.HttpDataSource('/model.json')
});

const getTodosLength = (input, state, output) => {
  model.
    get(['todos', 'length']).
    then((response) => {
      output({todosLength: response.json.todos.length});
    });
}

const getTodos = (input, state, output) => {
  const length = state.get('todosLength') - 1;

  model.
    get(['todos', {from: 0, to: length}, 'title']).
    then((response) => {
      output({todos: response.json.todos});
    }).
    catch((response) => {
      debugger
    });
}

const createTodo = (input, state, output) => {
  model.call(['todos', 'add'], [input.title], ['title']).
    then((response) => {
      const index = response.json.todos.length - 1;
      output(response.json.todos[index].title);
    }).
    catch((response) => {
      debugger
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
    const id = parseInt((Math.random() * 100), 10);
    const todo = { [id]: { title: input.title } }
    state.merge('todos', todo);
  },
  [getTodosLength], set('todosLength')
]);

ReactDOM.render(
  <Container controller={controller} falcor={model}><App/></Container>,
  document.getElementById('root')
);
