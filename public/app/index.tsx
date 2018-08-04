import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import App from './container/App'

import rootReducer from './reducer'
import rootSaga from './sagas'

// const customMiddleWare = store => next => action => {
// 	console.log('Middleware triggered:', action)
// 	return next(action)
// }

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
	rootReducer,
	applyMiddleware(
		sagaMiddleware,
		logger
		// customMiddleWare
	)
)

sagaMiddleware.run(rootSaga)

const Root = () => (
	<Provider store={store}>
		<Router>
			<>
				<Route path="/" component={App} />
			</>
		</Router>
	</Provider>
)

const render = Component => {
	ReactDOM.render(<Component />, document.getElementById('app'))
}

render(Root)

declare var module: any
if (module.hot) {
	module.hot.accept(Root, () => {
		render(Root)
	})
}
