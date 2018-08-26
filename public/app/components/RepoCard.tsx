import * as React from 'react'
import { IRepo } from '../interface'
import '../styles/RepoCard.pcss'
import {
	RepoOwner,
	RepoIconStat,
	RepoDetails,
	RepoIconsStats,
} from './SubComponents'

type IRepoCardItem = { repo: IRepo; isDetailedCard?: boolean }

function RepoCardItem({ repo, isDetailedCard = false }: IRepoCardItem) {
	return (
		<div className="repo-card__item">
			{isDetailedCard && <RepoOwner owner={repo.owner} />}
			<RepoDetails repo={repo} showFullDescription={isDetailedCard} />
			<RepoIconsStats repo={repo} showTopOnly={!isDetailedCard} />
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
	if (!repos.length) {
		return <div> No matching repos found! </div>
	}
	return (
		<div className="repo-card__row row">
			{repos.map(repo => (
				<div
					className="col-md-4 repo-card__wrapper"
					key={repo.node_id}
					onMouseEnter={() => onCardDetail(repo.node_id)}
					onMouseLeave={() => onCardDetail('')}>
					<RepoCardItem repo={repo} key={repo.node_id} />

					{detailCardNodeId === repo.node_id && (
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
