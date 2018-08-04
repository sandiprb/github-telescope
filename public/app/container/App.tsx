import * as React from 'react'
import { connect } from 'react-redux'
import { fetchStarredRepos } from '../actions'
// import '../css/App.pcss'
import { IRepo } from '../interface'

interface IAppProps {
	fetchStarredRepos: (username: string) => void
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

	private handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
		debugger
		e.preventDefault()

		const { username } = this.state

		if (!username) {
			this.setState({ errUsername: 'Please Enter a Valid Username' })
		}

		this.props.fetchStarredRepos(this.state.username)
	}

	render() {
		const { repos = [] } = this.props
		const { username, errUsername } = this.state

		return (
			<div>
				<form action="" onSubmit={this.handleSubmitForm}>
					<div>
						<input
							type="text"
							onChange={e => this.setState({ username: e.target.value })}
						/>

						{errUsername}
					</div>
					<input type="submit" value="Submit" />
				</form>
				{!!repos.length && (
					<ul>
						{repos.map(repo => {
							return (
								<li key={repo.url}>
									<a href={repo.html_url} target="_blank">
										{repo.name} * {repo.stargazers_count}
									</a>
									<p>{repo.description}</p>
								</li>
							)
						})}
					</ul>
				)}
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const { starredRepos = {} } = state
	return {
		repos: starredRepos.repos,
	}
}

const mapDispatchToProps = dispatch => ({
	fetchStarredRepos: (username: string) =>
		dispatch(fetchStarredRepos(username)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
