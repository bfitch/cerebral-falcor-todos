export default (options = {}) => {
  return (module) => {
    module.signals({
      setTodos: [({input,state}) => {
        state.set('todos', input.todos);
      }]
    });

    module.signalsSync({
      createTodo: [
        ({input, state}) => {
          state.merge('todos', input.todo);
        }]
    });
  }
}
