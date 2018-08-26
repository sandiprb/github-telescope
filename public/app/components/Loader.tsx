import * as React from 'react'
import '../styles/Loader.pcss'

interface ILoaderState {}

interface ILoaderProps {
	children?: any
}

export default class Loader extends React.Component<
	ILoaderProps,
	ILoaderState
> {
	constructor(props: ILoaderProps) {
		super(props)
	}

	render() {
		const { children } = this.props
		return (
			<>
				<div className="loader" />
				{children && <div className="loader-text">{children}</div>}
			</>
		)
	}
}
