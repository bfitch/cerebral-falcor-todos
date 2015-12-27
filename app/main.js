import React from 'react';
import ReactDOM from 'react-dom';
import {controller, falcorModel, call} from './controller';
import {Container} from './container';
import App from './app';

controller.signal('todoTextEntered', [
  [call(['todos', 'add'], 'title', ['title'])]
]);

ReactDOM.render(
  <Container controller={controller} falcorModel={falcorModel}><App/></Container>,
  document.getElementById('root')
);
