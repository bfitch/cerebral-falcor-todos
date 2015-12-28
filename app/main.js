import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from './container';
import App from './app';
import {controller, model} from './controller';
import falcorService from '../lib/falcor-service';
const {get, call, falcorGet} = falcorService(model);

const getTodos = (input, state, output) => {
  const length = state.get('todosLength') - 1;

  falcorGet(['todos', {from: 0, to: length}, 'title']).
    then(response => output()).
    catch(response => { debugger });
}

controller.signal('appMounted', [
  [get(['todosLength'])],
  [getTodos]
]);

controller.signal('todoTextEntered', [
  [call(['todos', 'add'], 'title', ['title'])]
]);

ReactDOM.render(
  <Container controller={controller}><App/></Container>,
  document.getElementById('root')
);
