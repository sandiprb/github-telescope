export interface IReducerState {
	test1: {
		[key: string]: string
	}
	isLoading: boolean
}

export interface IAction {
	type: string
	payload: any
	meta: any
	error: boolean
}
