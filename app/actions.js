const getTodos = ({state, output, services}) => {
  const length = state.get('todosLength') - 1;

  services.falcor.get(['todos', {from: 0, to: length}, 'title']).
    then(response => output(response.json)).
    catch(response => output.error);
}

const getTodosLength = ({output, services}) => {
  services.falcor.get(['todosLength']).
    then(response => output(response.json)).
    catch(response => output.error);
}

const createTodo = ({input, output, services}) => {
  services.falcor.call(['todos', 'add'], [input.title], ['title']).
    then(response => output(response.json)).
    catch(response => output.error);
}

export {getTodos, getTodosLength, createTodo};
