import { AxiosResponse } from 'axios'

export function extractLinksFromHeaders(headers: AxiosResponse['headers']) {
	debugger
	try {
		const [nextLink, ...lastLink] = headers.link
			.split(',')
			.filter(e => e.indexOf('next') !== -1 || e.indexOf('last') !== -1)
			.map(e => e.match(/\bhttps?:\/\/\S+/gi)[0].replace('>;', ''))
		return { nextLink, lastLink }
	} catch (error) {
		console.warn(error)
	}
}
