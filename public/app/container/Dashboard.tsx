import * as React from 'react'
import { connect } from 'react-redux'
import { fetchStarredRepos } from '../actions'
// import '../css/Dashboard.pcss'
import { IRepo } from '../interface'
import { RepoCards } from '../components/RepoCard'

type IFormEvent = React.FormEvent<HTMLFormElement>

interface IDashboardProps {
	fetchStarredRepos: (username: string) => void
	repos?: IRepo[]
	nextLink?: string
	username?: string
}

interface IDashboardStates {
	username?: string
	errUsername?: string
	detailCardNodeId?: string
}

class Dashboard extends React.Component<IDashboardProps, IDashboardStates> {
	constructor(props) {
		super(props)
		this.state = {
			username: 'sandiprb',
		}
	}

	componentDidMount() {
		this.fetchInitial()
	}

	private fetchInitial() {
		this.props.fetchStarredRepos(this.props.username)
	}

	private handleCardDetail = (nodeId: IRepo['node_id']) => {
		this.setState({ detailCardNodeId: nodeId })
	}

	render() {
		const { repos = [], nextLink = '' } = this.props
		const { username, detailCardNodeId } = this.state

		return (
			<div className="container">
				<h2>Dashboard</h2>
				<div className="row">
					<div className="col-sm-3" />
					<div className="col-sm-9">
						<RepoCards
							repos={repos}
							detailCardNodeId={detailCardNodeId}
							onCardDetail={this.handleCardDetail}
						/>
					</div>
				</div>
				{/* {nextLink && <button onClick={this.handleLoadMore}> Load More </button>} */}
			</div>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	const { starredRepos = {} } = state
	const { username } = ownProps.match.params
	return {
		repos: starredRepos.repos,
		nextLink: starredRepos.nextLink,
		username,
	}
}

const mapDispatchToProps = dispatch => ({
	fetchStarredRepos: (username: string) =>
		dispatch(fetchStarredRepos(username)),
})

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Dashboard)
