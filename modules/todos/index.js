import {getTodos, getTodosLength, createTodo} from './actions';

export default (options = {}) => {
  return (module) => {

    module.state({
      todosLength: 0,
      todos: []
    });

    module.signals({
      getTodos: [
        [getTodosLength],
        [getTodos]
      ],
    });

    module.signalsSync({
      createTodo: [createTodo]
    });
  }
}
