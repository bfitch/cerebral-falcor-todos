import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import {Decorator as Falcor} from 'cerebral-module-falcor';
import {filter,map} from 'lodash';

@Cerebral()
@Falcor([
  `todos[0..50].title`
])
export default class App extends React.Component {
  textEntered(event) {
    if (event.keyCode === 13) {
      this.props.signals.todoTextEntered.sync({title: event.target.value});
      event.target.value = '';
    }
  }
  render() {
    const {falcor} = this.props;
    const todos = filter(falcor('todos',''), 'title');

    if (todos) {
      return (
        <div>
          <input onKeyDown={this.textEntered.bind(this)} />
          <ul>{todos.map(todo => <li>{todo.title}</li>)}</ul>
        </div>
      );
    } else {
      return <h1>No Todos to display</h1>;
    }
  }
}
