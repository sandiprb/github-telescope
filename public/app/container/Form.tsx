import * as React from 'react'
import { connect } from 'react-redux'
import '../styles/App.pcss'
import { IRepo } from '../interface'
import { Container, Row } from '../components/SubComponents'
import * as Utils from '../Utils'

type IFormEvent = React.FormEvent<HTMLFormElement>

interface IAppProps {
	history?: any
	repos?: IRepo[]
}

interface IAppStates {
	username?: string
	errUsername?: string
}

class App extends React.Component<IAppProps, IAppStates> {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
		}
	}

	componentDidMount() {
		Utils.updatePageTitle('Welcome')
	}

	private handleSubmitForm = (e: IFormEvent) => {
		e.preventDefault()

		const { username } = this.state

		if (!username) {
			this.setState({ errUsername: 'Please enter your Github username' })
			return
		}
		this.props.history.push(`/${username}`)
	}

	private handleUsernameChange = e => {
		const username = e.target.value
		this.setState({ username, errUsername: '' })
	}

	render() {
		const { repos = [] } = this.props
		const { errUsername, username } = this.state

		return (
			<Container>
				<Row>
					<div className="col-sm-6 offset-sm-3">
						<div className="logo-telescope" />
						<form action="" onSubmit={this.handleSubmitForm}>
							<div>
								<input
									className="form-control form-control-lg"
									type="text"
									value={username}
									onChange={this.handleUsernameChange}
									placeholder="Enter Github Username.."
								/>

								{errUsername && <div className="error">{errUsername}</div>}
							</div>
							<br />

							<div className="text-center">
								<input
									type="submit"
									value="FIND MY STARS"
									className="btn btn-black btn-lg"
								/>
							</div>
						</form>
					</div>
				</Row>
			</Container>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const { starredRepos = {} } = state
	return {
		history: ownProps.history,
	}
}

const mapDispatchToProps = dispatch => ({})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
