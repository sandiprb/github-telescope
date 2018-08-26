import * as React from 'react'
import { connect } from 'react-redux'
import Select from 'react-select'
import { fetchStarredRepos, fetchMoreRepos, filterRepos } from '../actions'
import { IRepo } from '../interface'
import { RepoCards } from '../components/RepoCard'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import * as Utils from '../Utils'

type IFormEvent = React.FormEvent<HTMLFormElement>

interface IDashboardProps {
	fetchStarredRepos: (username: string) => void
	fetchMoreRepos: (username, nextLink) => void
	filterRepos: (language) => void
	repos?: IRepo[]
	nextLink?: string
	username?: string
	isLoading?: boolean
	languages?: IRepo['language'][]
	filterByLanguages?: IRepo['language'][]
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
		languages: starredRepos.languages,
		filterByLanguages: starredRepos.filterByLanguages,
		username,
	}
}

const mapDispatchToProps = dispatch => ({
	fetchStarredRepos: (username: string) =>
		dispatch(fetchStarredRepos(username)),
	fetchMoreRepos: (username, nextLink) =>
		dispatch(fetchMoreRepos(username, nextLink)),
	filterRepos: language => dispatch(filterRepos(language)),
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

	private getVisibleRepos = (): IRepo[] => {
		const { repos = [], languages, filterByLanguages } = this.props
		const { repoSearchText } = this.state

		let visibleRepos = repos

		// 1. Filter By Search Query
		visibleRepos = repoSearchText
			? visibleRepos.filter(
					repo =>
						repo.name.indexOf(repoSearchText) > -1 ||
						(repo.description && repo.description.indexOf(repoSearchText) > -1)
			  )
			: visibleRepos
		// Filter By Languaes
		visibleRepos = !!filterByLanguages.length
			? visibleRepos.filter(repo => {
					if (repo.language && !!languages) {
						return filterByLanguages.indexOf(repo.language) > -1
					}
					return false
			  })
			: visibleRepos
		return visibleRepos
	}

	private handleLanguageFilter = (languages: any[]) => {
		const selectedLanguages = languages.map(e => e.value)
		const { filterRepos } = this.props
		filterRepos && filterRepos(selectedLanguages)
	}

	render() {
		const {
			repos = [],
			nextLink = '',
			username,
			isLoading,
			languages,
		} = this.props
		const { detailCardNodeId, repoSearchText } = this.state

		const visibleRepos: IRepo[] = this.getVisibleRepos()

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
									placeholder={`Search through ${
										visibleRepos.length
									} repositories`}
									onChange={this.handleSearchInputChange}
									className="form-control"
								/>
								<br />
								<div className="row">
									<div className="offset-md-7 col-md-5">
										<div className="form-group">
											<Select
												placeholder="Filter by Programming Languages"
												isMulti={true}
												onChange={this.handleLanguageFilter}
												options={languages.map(e => ({ value: e, label: e }))}
											/>
										</div>
									</div>
								</div>
							</>
						)}

						<RepoCards
							repos={visibleRepos}
							detailCardNodeId={detailCardNodeId}
							onCardDetail={this.handleToggelCardDetail}
						/>

						{isLoading && (
							<Loader>
								Loading {!!visibleRepos.length ? 'more' : ''} starred repos of{' '}
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
