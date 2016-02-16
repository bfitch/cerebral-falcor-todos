import callAsyncAction from '../actions/call';

const call = [
  callAsyncAction,
  {
    success: [],
    error: [
      (e)=> {
        debugger;
      }
    ]
  }
];

export default call;