import { AxiosResponse } from 'axios'

export function extractLinksFromHeaders(headers: AxiosResponse['headers']) {
	try {
		const [nextLink, ...lastLink] = headers.link
			.split(',')
			.filter(e => e.indexOf('next') !== -1 || e.indexOf('last') !== -1)
			.map(e => e.match(/\bhttps?:\/\/\S+/gi)[0].replace('>;', ''))
		return { nextLink, lastLink }
	} catch (error) {
		console.warn(error)
		return { nextLink: undefined, lastLink: undefined }
	}
}

export const updatePageTitle = (title?: string) => {
	const mainTitle = '| Github TeleScope'
	const titleNode = document.getElementsByTagName('title')[0]
	titleNode &&
		(titleNode.innerText = `${title ? title : 'Welcome'} ${mainTitle}`)
}

const MONTH_MAP = {
	0: 'Jan',
	1: 'Feb',
	2: 'March',
	3: 'Apr',
	4: 'May',
	5: 'Jun',
	6: 'July',
	7: 'Aug',
	8: 'Sep',
	9: 'Oct',
	10: 'Nov',
	11: 'Dec',
}

export function timeStampToDate(dateString: string) {
	try {
		const [date, time] = dateString.split('T')
		const generateDate = new Date(date)
		return `${generateDate.getDate()} ${
			MONTH_MAP[generateDate.getMonth()]
		} ${generateDate.getFullYear()}`
	} catch (error) {
		console.warn(error)
		return dateString
	}
}
