const express       = require('express');
const falcorExpress = require('falcor-express');
const Router        = require('falcor-router');
const bodyParser    = require('body-parser');
const _             = require('lodash');
const data          = require('../app/falcor_cache').default;

const app = express();
app.use(bodyParser.urlencoded({extended: false}));

function buildRefPathSetResults(resource, index, attrs) {
  const attributes = _.isArray(attrs) ? attrs : [attrs];

  return _.reduce(attributes, (memo, attr) => {
    return memo.concat({
      path:  [resource, index],
      value: data[resource][index]
    });
  }, []);
}

function buildPathSetResults(resource, index, attrs) {
  const attributes = _.isArray(attrs) ? attrs : [attrs];

  return _.reduce(attributes, (memo, attr) => {
    return memo.concat({
      path:  [resource, index, attr],
      value: data[resource][index][attr]
    });
  }, []);
}

app.use('/api/model.json', falcorExpress.dataSourceRoute(function(req, res) {
  return new Router([
    {
      route: "todos.add",
      call: (callPath, args) => {

        const title = args[0];
        const id = _.random(1,10000);

        _.extend(data.todosById, {[id]: {title: title, completed: false}});
        data.todos.push({$type: 'ref', value: ['todosById', id]});

        return [
          {
            path: ['todos', data.todos.length - 1],
            value: {$type: "ref", value: ["todosById", id]}
          },
          {
            path: ['todosLength'],
            value: data.todos.length
          }
        ]
      }
    },
    {
      route: "todosLength",
      get: function(pathSet) {
        const [resource, attrs] = pathSet;

        return [{
          path: ['todosLength'], value: data['todos'].length
        }];
      }
    },
    {
      route: "todos[{integers:indices}]",
      get: function(pathSet) {
        const [resource, range, attrs] = pathSet;

        return _.flatten(_.map(pathSet.indices, (index) => {
          return buildRefPathSetResults(resource, index, attrs);
        }));
      }
    },
    {
      route: "todosById[{integers:ids}]['title']",
      get: function(pathSet) {
        const [resource, range, attrs] = pathSet;

        return _.flatten(_.map(pathSet.ids, (index) => {
          return buildPathSetResults(resource, index, attrs);
        }));
      }
    }
  ]);
}));

app.get('/', function(req, res) {
  return res.send(fs.readFileSync(path.resolve('..', 'index.html')));
});

module.exports = app;
