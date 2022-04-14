export default ({
  namespace: 'mic',
  state: {
    burger:{},
    pizza:{},
    sandwich:{},
    hotdog:{},
    asd:{
      big:false,
      small:false
    }
  },
  subscription:{
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
