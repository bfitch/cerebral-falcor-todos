import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from './container';
import App from './app';
import {controller, model} from './controller';
import FalcorModule from './modules/falcor/module';
import {getTodos, getTodosLength, createTodo} from './actions';

controller.extends({
  falcor: FalcorModule({
    source: '/model.json',
    model: model
  })
});

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
