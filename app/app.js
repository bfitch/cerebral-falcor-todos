import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';

@Cerebral({
  todos: ['todos']
})
export default class App extends React.Component {
  componentDidMount() {
    this.props.signals.appMounted();
  }

  textEntered(event) {
    if (event.keyCode === 13) {
      this.props.signals.todoTextEntered.sync({title: event.target.value});
      event.target.value = '';
    }
  }

  render() {
    if (this.props.todos) {
      const todos = Object.keys(this.props.todos).map(id => <li key={id}>{this.props.todos[id].title}</li>);
      return (
        <div>
          <input onKeyDown={this.textEntered.bind(this)} />
          <ul>{todos}</ul>
        </div>
      );
    } else {
      return <p>Loading</p>;
    }
  }
}
