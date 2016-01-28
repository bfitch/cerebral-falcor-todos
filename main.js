import React from 'react';
import ReactDOM from 'react-dom';
import {Container} from 'cerebral-view-react';
import Controller from 'cerebral';
import Model from 'cerebral-model-baobab';
import App from './app';
import Todos from './modules/todos';
// import FalcorModule from 'cerebral-falcor-module';
import FalcorModule from './cerebral-falcor-module-dev';

const controller = Controller(Model({}));

controller.modules({
  todos: Todos(),
  falcor: FalcorModule()
});

ReactDOM.render(
  <Container controller={controller}>
    <App/>
  </Container>,
  document.getElementById('root')
);
