import * as React from 'react'
import { IOwner, IRepo } from '../interface'
import { timeStampToDate } from '../Utils'

type ITrimmedText = {
	text: string
	maxLength?: number
}

export const TrimmedText = ({ text, maxLength = 99 }: ITrimmedText) => {
	return text ? (
		<div>
			{text && text.length > maxLength
				? `${text.substring(0, maxLength)}...`
				: text}
		</div>
	) : null
}

export const RepoOwner = ({ owner }: { owner: IOwner }) => (
	<>
		<a href={owner.html_url} target="_blank">
			<div className="repo-card__owner">
				<div className="repo-card__owner-img-wrapper">
					<img
						className="img-thumbnail"
						src={owner.avatar_url}
						alt={owner.login}
					/>
				</div>
				<div className="repo-card__owner-name">@{owner.login}</div>
			</div>
		</a>
		<hr />
	</>
)

//#region RepoIconStat
type RepoIconsStats = {
	repo: IRepo
	showTopOnly: boolean
}

export const RepoIconsStats = ({
	repo,
	showTopOnly = true,
}: RepoIconsStats) => {
	return (
		<>
			<div className="repo-card__stats">
				<RepoIconStat text={repo.stargazers_count} iconClassName="star" />
				<RepoIconStat text={repo.watchers_count} iconClassName="watch" />
				<RepoIconStat text={repo.forks_count} iconClassName="fork" />
			</div>
			{!showTopOnly && (
				<>
					<div className="repo-card__stats">
						<RepoIconStat text={repo.open_issues_count} iconClassName="issue" />
						{repo.license && (
							<RepoIconStat
								text={repo.license.spdx_id}
								iconClassName="license"
							/>
						)}

						<div className="repo-card__stats-item" />
					</div>
					<hr />
				</>
			)}
		</>
	)
}

type IRepoIconStat = {
	iconClassName: string
	text: string | number
}

export const RepoIconStat = ({ iconClassName, text }: IRepoIconStat) => {
	return text ? (
		<div
			className={`repo-card__stats-item repo-card__stats-item--${iconClassName}`}>
			{text}
		</div>
	) : null
}
//#endregion

//#region RepoDetails
type IRepoDetails = {
	repo: IRepo
	showFullDescription?: boolean
}

export const RepoDetails = ({ repo, showFullDescription }: IRepoDetails) => (
	<>
		<div className="repo-card__repo-name">{repo.name}</div>
		<div className="repo-card__repo-date">
			Updated: {timeStampToDate(repo.updated_at)}
		</div>
		<div className="repo-card__repo-desc">
			{showFullDescription ? (
				repo.description
			) : (
				<TrimmedText text={repo.description} />
			)}
		</div>
	</>
)

//#endregion
