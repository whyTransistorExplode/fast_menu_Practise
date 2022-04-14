export default ({
  namespace: 'globalModel',
  state: {
    orderList: [],
    lastid: 0
  },
  subscription: {
    setupHistory({dispatch, history}) {
      history.listen((location) => {
        console.log('subscription: ' + location.pathname)
      })
    }
  },
  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload
      }
    }
  }
});
