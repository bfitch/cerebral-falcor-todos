import React from 'react';
import ReactDOM from 'react-dom';
import controller from './controller';
import {Container} from 'cerebral-react';
import App from './app';

const getTodos = (input, state, output) => {
  var model = new falcor.Model({
    source: new falcor.HttpDataSource('/model.json')
  });

  model.
    get("greeting").
    then((response) => {
      output({greeting: response.json.greeting});
    });   
}

const setTodos = (input, state) => {
  state.set('greeting', input.greeting);
}

controller.signal('appMounted', [
  [getTodos], setTodos
]);

ReactDOM.render(
  <Container controller={controller}><App/></Container>,
  document.getElementById('root')
);
