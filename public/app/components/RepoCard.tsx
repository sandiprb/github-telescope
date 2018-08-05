import * as React from 'react'
import { IRepo } from '../interface'
import '../styles/RepoCard.pcss'
import { timeStampToDate } from '../Utils'

function RepoIconStat({
	iconClassName,
	text,
}: {
	iconClassName: string
	text: string | number
}) {
	if (!text) {
		return null
	}

	return (
		<div
			className={`repo-card__stats-item repo-card__stats-item--${iconClassName}`}>
			{text}
		</div>
	)
}

type IRepoCardItem = { repo: IRepo; isDetailedCard?: boolean }

function RepoCardItem({ repo, isDetailedCard = false }: IRepoCardItem) {
	return (
		<div className="repo-card__item">
			{isDetailedCard && (
				<>
					<div className="repo-card__owner">
						<div className="repo-card__owner-img-wrapper">
							<img
								className="img-thumbnail"
								src={repo.owner.avatar_url}
								alt={repo.owner.login}
							/>
						</div>

						<div className="repo-card__owner-name">
							<a href={repo.owner.html_url} target="_blank">
								@{repo.owner.login}
							</a>
						</div>
					</div>
					<hr />
				</>
			)}
			<div className="repo-card__repo-name">{repo.name}</div>
			{}
			<div className="repo-card__repo-date">
				{' '}
				Updated: {timeStampToDate(repo.updated_at)}{' '}
			</div>
			<div className="repo-card__repo-desc">
				{repo.description && repo.description.length > 99
					? `${repo.description.substring(0, 90)}...`
					: repo.description}
			</div>
			<div className="repo-card__stats">
				<RepoIconStat text={repo.stargazers_count} iconClassName="star" />
				<RepoIconStat text={repo.watchers_count} iconClassName="watch" />
				<RepoIconStat text={repo.forks_count} iconClassName="fork" />
			</div>
			{isDetailedCard && (
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
		</div>
	)
}

type IRepoCards = {
	repos: IRepo[]
	onCardDetail: (nodeId) => void
	detailCardNodeId: string
}

export function RepoCards({
	repos,
	onCardDetail,
	detailCardNodeId,
}: IRepoCards) {
	return (
		<div className="repo-card__row row">
			{repos.map(repo => (
				<div
					className="col-md-4 repo-card__wrapper"
					key={repo.node_id}
					onMouseEnter={() => onCardDetail(repo.node_id)}>
					<RepoCardItem repo={repo} key={repo.node_id} />

					{/*'MDEwOlJlcG9zaXRvcnkzOTk3OTkzNg==' */
					detailCardNodeId === repo.node_id && (
						<div className="repo-card__detail-info">
							<RepoCardItem
								repo={repo}
								key={repo.node_id}
								isDetailedCard={true}
							/>
						</div>
					)}
				</div>
			))}
		</div>
	)
}
