import React from 'react';
import Mixin from './falcor_mixin';

const App = React.createClass({
  mixins: [Mixin],
  
  getStatePaths() {
    return { todos: ['todos'] };
  },
  componentDidMount: function() {
    this.signals.appMounted();
  },
  textEntered(event) {
    if (event.keyCode === 13) {
      this.signals.todoTextEntered.sync({title: event.target.value});
      event.target.value = '';
    }
  },
  render() {
    if (this.state.todos) {
      const todos = Object.keys(this.state.todos).map((id) => {
        return <li key={id}>{this.state.todos[id].title}</li>;
      });
      return (
        <div>
          <input onKeyDown={this.textEntered} />
          <ul>{todos}</ul>
        </div>
      );
    } else {
      return (
        <div>
          <input onKeyDown={this.textEntered} />
          <p>Loading</p>
        </div>
      );
    }
  }
});

export default App;
