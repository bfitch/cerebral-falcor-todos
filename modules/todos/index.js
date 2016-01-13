import {getTodos, getTodosLength, createTodo} from './actions';

      // [getTodos],
      // [createTodo]
      //

      const todos = [getTodosLength];

export default (options = {}) => {
  return (module) => {

    // module.state({
    //   todosLength: 0,
    //   todos: []
    // });

    module.signals({
      todos
    });
  }
}
