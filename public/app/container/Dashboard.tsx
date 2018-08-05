import * as React from 'react'
import { connect } from 'react-redux'
import { fetchStarredRepos } from '../actions'
// import '../css/Dashboard.pcss'
import { IRepo } from '../interface'
import { RepoCards } from '../components/RepoCard'
import { Link } from 'react-router-dom'

type IFormEvent = React.FormEvent<HTMLFormElement>

interface IDashboardProps {
	fetchStarredRepos: (username: string) => void
	repos?: IRepo[]
	nextLink?: string
	username?: string
}

interface IDashboardStates {
	detailCardNodeId?: string
	repoSearchText?: string
}

class Dashboard extends React.Component<IDashboardProps, IDashboardStates> {
	constructor(props) {
		super(props)
		this.state = {
			detailCardNodeId: '',
			repoSearchText: '',
		}
	}

	componentDidMount() {
		this.fetchInitial()
	}

	private fetchInitial() {
		this.props.fetchStarredRepos(this.props.username)
	}

	private handleToggelCardDetail = (nodeId?: IRepo['node_id']) => {
		this.setState({ detailCardNodeId: nodeId })
	}

	private handleLoadMore = e => {
		e.preventDefault()
		this.props.fetchStarredRepos(this.props.username)
	}

	private handleSearchInputChange = e => {
		this.setState({ repoSearchText: e.target.value })
	}

	private getFilteredRepose = (): IRepo[] => {
		const { repos = [] } = this.props
		const { repoSearchText } = this.state
		return repos.filter(
			repo =>
				repo.name.indexOf(repoSearchText) > -1 ||
				(repo.description && repo.description.indexOf(repoSearchText) > -1)
		)
	}

	render() {
		const { repos = [], nextLink = '', username } = this.props
		const { detailCardNodeId, repoSearchText } = this.state

		const reposToShow: IRepo[] = repoSearchText
			? this.getFilteredRepose()
			: repos

		return (
			<div className="container">
				<div className="row">
					{/* <div className="col-sm-3" /> */}

					<div className="col-sm-10 offset-sm-1">
						<Link
							className="btn btn-link"
							to="/"
							title="Search for abother user">
							{'< Back'}
						</Link>

						<h2>
							Starred Repos of <strong> @{username} </strong>
						</h2>
						<input
							type="text"
							value={repoSearchText}
							placeholder={`Search through ${repos.length} repositories`}
							onChange={this.handleSearchInputChange}
							className="form-control"
						/>
						<br />
						<RepoCards
							repos={reposToShow}
							detailCardNodeId={detailCardNodeId}
							onCardDetail={this.handleToggelCardDetail}
						/>
						<div className="text-center">
							{nextLink && (
								<button className="btn btn-black" onClick={this.handleLoadMore}>
									Load More{' '}
								</button>
							)}
						</div>
					</div>
				</div>
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
