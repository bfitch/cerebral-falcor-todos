export default {
  usersById: {
    '1': {
      first_name: 'Bob',
      last_name: 'Slob'
    },
    '2': {
      first_name: 'Jane',
      last_name: 'Pain'
    }
  },

  todosById: {
    '1': {
      title: 'foo',
      completed: false,
      // user: { $type: 'ref', value: ['usersById', 1] }
    },
    '2': {
      title: 'boo',
      completed: true,
      // user: { $type: 'ref', value: ['usersById', 2] }
    }
  },

  todos: [
    { $type: 'ref', value: ['todosById', 1] },
    { $type: 'ref', value: ['todosById', 2] }
  ] 
}
