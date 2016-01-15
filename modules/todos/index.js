import {getTodos, getTodosLength, createTodo} from './actions';

export default (options = {}) => {
  return (module) => {

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
