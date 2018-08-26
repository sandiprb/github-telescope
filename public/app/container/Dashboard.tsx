import * as React from 'react'
import { connect } from 'react-redux'
import { fetchStarredRepos, fetchMoreRepos } from '../actions'
import { IRepo } from '../interface'
import { RepoCards } from '../components/RepoCard'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import * as Utils from '../Utils'

type IFormEvent = React.FormEvent<HTMLFormElement>

interface IDashboardProps {
	fetchStarredRepos: (username: string) => void
	fetchMoreRepos: (username, nextLink) => void
	repos?: IRepo[]
	nextLink?: string
	username?: string
	isLoading?: boolean
}

interface IDashboardStates {
	detailCardNodeId?: string
	repoSearchText?: string
}

const mapStateToProps = (state, ownProps) => {
	const { starredRepos = {}, isLoading } = state
	const { username } = ownProps.match.params
	return {
		repos: starredRepos.repos,
		nextLink: starredRepos.nextLink,
		isLoading: starredRepos.isLoading,
		username,
	}
}

const mapDispatchToProps = dispatch => ({
	fetchStarredRepos: (username: string) =>
		dispatch(fetchStarredRepos(username)),
	fetchMoreRepos: (username, nextLink) =>
		dispatch(fetchMoreRepos(username, nextLink)),
})

@connect(
	mapStateToProps,
	mapDispatchToProps
)
export default class Dashboard extends React.Component<
	IDashboardProps,
	IDashboardStates
> {
	constructor(props) {
		super(props)
		this.state = {
			detailCardNodeId: '',
			repoSearchText: '',
		}
	}

	componentDidMount() {
		this.fetchInitial()
		Utils.updatePageTitle(this.props.username)
	}

	private fetchInitial() {
		this.props.fetchStarredRepos(this.props.username)
	}

	private handleToggelCardDetail = (nodeId?: IRepo['node_id']) => {
		this.setState({ detailCardNodeId: nodeId })
	}

	private handleLoadMore = e => {
		e.preventDefault()
		this.props.fetchMoreRepos(this.props.username, this.props.nextLink)
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
		const { repos = [], nextLink = '', username, isLoading } = this.props
		console.log('isLoading', isLoading)
		const { detailCardNodeId, repoSearchText } = this.state

		const reposToShow: IRepo[] = repoSearchText
			? this.getFilteredRepose()
			: repos

		return (
			<div className="container">
				<div className="row">
					<div className="col-sm-10 offset-sm-1">
						{!!repos.length && (
							<>
								<Link
									className="btn btn-link"
									to="/"
									title="Search for another user">
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
							</>
						)}

						{isLoading && (
							<Loader>
								Loading {!!repos.length ? 'more' : ''} starred repos of{' '}
								<strong>{username}</strong>
							</Loader>
						)}

						<div className="text-center">
							{nextLink && (
								<button className="btn btn-black" onClick={this.handleLoadMore}>
									Load More
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		)
	}
}
