import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';

@Cerebral({
  todos: ['todos']
})
class App extends React.Component {
  componentDidMount() {
    this.props.signals.appMounted();
  }

  render() {
    if (this.props.todos) {
      const todos = Object.keys(this.props.todos).map(id => <li key={id}>{this.props.todos[id].title}</li>);
      return (
        <ul>{todos}</ul>
      );
    } else {
      return <p>Loading</p>;
    }
  }
}

export default App;
