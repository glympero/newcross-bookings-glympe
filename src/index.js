import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
//import { Values } from 'redux-form-website-template'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

const dest = document.getElementById('content')
const reducer = combineReducers({
  form: reduxFormReducer // mounted under "form"
})
const store = (window.devToolsExtension
  ? window.devToolsExtension()(createStore)
  : createStore)(reducer)

const showResults = values =>
  new Promise(resolve => {
    setTimeout(() => {
      // simulate server latency
      window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
      resolve()
    }, 500)
  })

let render = () => {
  const WizardForm = require('./WizardForm').default

  ReactDOM.hydrate(
    <Provider store={store}>
      <MuiThemeProvider>
        <WizardForm onSubmit={showResults} />
      </MuiThemeProvider>
    </Provider>,
    dest
  )
}

render()
