import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import falcor from 'falcor';
import HTTPDataSource from 'falcor-http-datasource';

@Cerebral((props) => ({
  todos: ['todos']
}))
export default class App extends React.Component {
  componentDidMount() {
    const source = new HTTPDataSource('/model.json');
    this.model   = new falcor.Model({source});

    this.model.get(['todos', {from: 0, to: 10}, 'title']).subscribe(data => {
      this.props.signals.todos.setTodos({todos: data.json.todos});
    });
  }
  textEntered(event) {
    if (event.keyCode === 13) {
      this.model.call(['todos', 'add'], [event.target.value], ['title']).then(response => {
        this.props.signals.todos.createTodo({todo: response.json.todos});
      });
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
