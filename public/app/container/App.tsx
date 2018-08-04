import * as React from 'react'
import { connect } from 'react-redux'
import { fetchTestAction } from '../actions'
// import '../css/App.pcss'

interface IAppProps {
	fetchTestAction: () => void
}

class App extends React.Component<IAppProps, {}> {
	constructor(props) {
		super(props)
	}

	componentWillMount() {
		this.props.fetchTestAction()
	}

	render() {
		return <div>Hello!</div>
	}
}

const mapStateToProps = (state, ownProps) => {
	console.log(state)
	// const { users } = state
	// return {
	// 	users,
	// }
}

const mapDispatchToProps = dispatch => ({
	fetchTestAction: () => dispatch(fetchTestAction()),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
