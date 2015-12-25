import React from 'react';
import ReactDOM from 'react-dom';
import controller from './controller';
import {Container} from './container';
import App from './app';

const getTodosLength = (input, state, output, {model}) => {
  model.
    get(['todosLength']).
    then(response => output());
}

const getTodos = (input, state, output, {model}) => {
  const length = state.get('todosLength') - 1;

  model.
    get(['todos', {from: 0, to: length}, 'title']).
    then(response => output()).
    catch(response => { debugger });
}

const createTodo = (input, state, output, {model}) => {
  model.call(['todos', 'add'], [input.title], ['title']).
    then(response => output()).
    catch(response => { debugger });
}

const set = (path) => {
  function action(input, state, output) {
    state.set(path, input[path]);
  }
  action.displayName = `set(${path})`;
  return action;
}

controller.signal('appMounted', [
  [getTodosLength],
  [getTodos]
]);

controller.signal('todoTextEntered', [
  [createTodo]
]);

ReactDOM.render(
  <Container controller={controller}><App/></Container>,
  document.getElementById('root')
);
