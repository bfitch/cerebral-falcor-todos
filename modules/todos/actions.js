const getTodosLength = ({output, services}) => {
  services.falcor.get(['todosLength']).
    then(response => output(response.json)).
    catch(response => output.error);
}

const getTodos = ({state, output, modules, services}) => {
  const falcor = modules['cerebral-module-falcor'];
  const length = falcor.state.get('todosLength') - 1;

  services.falcor.get(['todos', {from: 0, to: length}, 'title']).
    then(response => output(response.json)).
    catch(response => output.error);
}

const createTodo = ({input, output, services}) => {
  services.falcor.call(['todos', 'add'], [input.title], ['title']).
    then(response => output(response.json)).
    catch(response => output.error);
}

export {getTodos, getTodosLength, createTodo};
