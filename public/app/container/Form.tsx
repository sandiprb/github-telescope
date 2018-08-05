import * as React from 'react'
import { connect } from 'react-redux'
import { fetchStarredRepos } from '../actions'
// import '../css/App.pcss'
import { IRepo } from '../interface'

type IFormEvent = React.FormEvent<HTMLFormElement>

interface IAppProps {
	history?: any
	repos?: IRepo[]
	nextLink?: string
}

interface IAppStates {
	username?: string
	errUsername?: string
}

class App extends React.Component<IAppProps, IAppStates> {
	constructor(props) {
		super(props)
		this.state = {
			username: 'sandiprb',
		}
	}

	private handleSubmitForm = (e: IFormEvent) => {
		e.preventDefault()

		const { username } = this.state

		if (!username) {
			this.setState({ errUsername: 'Please Enter a Valid Username' })
			return
		}
		console.log(this.props.history.push(`/${username}`))
	}

	private handleLoadMore = e => {
		e.preventDefault()
		// this.props.fetchStarredRepos(this.state.username)
	}

	render() {
		const { repos = [], nextLink = '' } = this.props
		const { errUsername, username } = this.state

		return (
			<div>
				<form action="" onSubmit={this.handleSubmitForm}>
					<div>
						<input
							type="text"
							value={username}
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
				{nextLink && <button onClick={this.handleLoadMore}> Load More </button>}
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const { starredRepos = {} } = state
	console.log(ownProps)
	return {
		history: ownProps.history,
		// repos: starredRepos.repos,
		// nextLink: starredRepos.nextLink,
	}
}

const mapDispatchToProps = dispatch => ({
	// fetchStarredRepos: (username: string) =>
	// 	dispatch(fetchStarredRepos(username)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
