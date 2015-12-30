const getTodos = (input, state, output, {falcor}) => {
  const length = state.get('todosLength') - 1;
  falcor.get(['todos', {from: 0, to: length}, 'title']).
    then(response => output(response.json)).
    catch(response => output.error);
}

const getTodosLength = (input, state, output, {falcor}) => {
  falcor.get(['todosLength']).
    then(response => output(response.json)).
    catch(response => output.error);
}

const createTodo = (input, state, output, {falcor}) => {
  falcor.call(['todos', 'add'], [input.title], ['title']).
    then(response => output(response.json)).
    catch(response => output.error);
}

export {getTodos, getTodosLength, createTodo};
