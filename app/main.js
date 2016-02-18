import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'cerebral-view-react';
import controller from './controller';
import App from './app';
import Devtools from 'cerebral-module-devtools';
import FalcorModule from '../cerebral-module-falcor/src';
import {createTodo} from './actions';

controller.addModules({
  devtools: Devtools(),
  falcor: FalcorModule()
});

controller.addSignals({
  todoTextEntered: [
    createTodo
  ]
});

ReactDOM.render(
  <Container controller={controller}><App/></Container>,
  document.getElementById('root')
);
