import React from 'react';
import ReactDOM from 'react-dom';
import {controller, falcorModel} from './controller';
import {Container} from './container';
import App from './app';

const createTodo = (input, state, output, {model}) => {
  model.call(['todos', 'add'], [input.title], ['title']).
    then(response => output()).
    catch(response => { debugger });
}

controller.signal('todoTextEntered', [
  [createTodo]
]);

ReactDOM.render(
  <Container controller={controller} falcorModel={falcorModel}><App/></Container>,
  document.getElementById('root')
);
