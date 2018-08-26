import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import createSagaMiddleware from 'redux-saga'

import Index from './container/Form'

import rootReducer from './reducer'
import rootSaga from './sagas'
import Dashboard from './container/Dashboard'

// const customMiddleWare = store => next => action => {
// 	console.log('Middleware triggered:', action)
// 	return next(action)
// }

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
	rootReducer,
	window['__REDUX_DEVTOOLS_EXTENSION__'] &&
		window['__REDUX_DEVTOOLS_EXTENSION__'](),
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
			<Switch>
				<Route exact path="/" component={Index} />
				<Route exact path="/404" component={() => <div>404</div>} />
				<Route exact path="/:username" component={Dashboard} />
			</Switch>
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
