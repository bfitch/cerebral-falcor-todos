import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';

@Cerebral({
  todos: ['falcor', 'todos']
})
export default class App extends React.Component {
  componentDidMount() {
    this.props.signals.todos.getTodos();
  }
  textEntered(event) {
    if (event.keyCode === 13) {
      this.props.signals.todos.createTodo({title: event.target.value});
      event.target.value = '';
    }
  }
  render() {
    if (this.props.todos) {
      const todos = Object.keys(this.props.todos).map((id) => {
        return <li key={id}>{this.props.todos[id].title}</li>;
      });

      return (
        <div>
          <input onKeyDown={this.textEntered.bind(this)} />
          <ul>{todos}</ul>
        </div>
      );
    } else {
      return (
        <div>
          <input />
          <p>Loading</p>
        </div>
      );
    }
  }
}
