import React from 'react';
import {Decorator as Cerebral} from 'cerebral-react';

@Cerebral({
  greeting: ['greeting']
})
class App extends React.Component {
  componentDidMount() {
    this.props.signals.appMounted();
  }

  render() {
    return (
      <div>
        {this.props.greeting}
      </div>
    );
  }
}

export default App;
