const axios = require("axios")
exports.handler = async ( event , context ) => {
	const {body, httpMethod, queryStringParameters, path} = event
	if (httpMethod !== "GET") {
		return { statusCode: 405, body: "Method Not Allowed" };
	}
	let {url, id, sheet, format} = queryStringParameters
	if (!id){
		try {
			id = url.replace("https://docs.google.com/spreadsheets/d/", '').split('/')[0]
		}
		catch(e){
			return { statusCode: 400 , body: JSON.stringify({error:"Please pass a valid id or url parameter"}) } 
		}
	}
	const googleFormat = await axios.get(`https://spreadsheets.google.com/feeds/cells/${id}/${sheet || 1}/public/full?alt=json`)
		.then(r => r.data)
		.catch(e => null)
	if (!googleFormat){
		return { statusCode: 400 , body: JSON.stringify({error:`Spreadsheet not found. Make sure you pass a valid url or id and that your spreadsheet is set as public.`}) }; 
	}

	const columns = {}
	try {
		googleFormat.feed.entry.forEach(row => {
			const arr = columns[row.gs$cell.col] || []
			columns[row.gs$cell.col] = arr.concat([row.content.$t])
		})
	}
	catch(e){
		return { statusCode: 400 , body: JSON.stringify({error:"Your Spreadsheet doesn't seem to be public!"}) }
	}
	console.log(format, typeof format)
	if (!format || format==1) {
		return { statusCode: 200 , body: JSON.stringify(columns) }
	}
	else if (format == 2 || format == 3) {
		const withHeader = {}
		Object.keys(columns).forEach(column => {
			const values = columns[column]
			const header = values.shift()
			withHeader[header] = values
		})
		if (format == 2) {
			return { statusCode: 200 , body: JSON.stringify(withHeader) }
		}
		else if (format == 3) {
			const lengths = Object.values(columns).map(v => v.length)
			const sameLength = lengths.every( (len, i, lengths) => len === lengths[0] )
			if (!sameLength){
				return { statusCode: 400 , body: JSON.stringify({error:"It seems that your spreadsheet has some empty cells. Make sure that there are no empty cells to use this format. "}) }
			}

			const headers = Object.keys(withHeader)
			const firstHeader = headers[0]
			const values = withHeader[firstHeader].map((value, valueIndex) => {
				const temp = {}
				headers.forEach(header => temp[header] = withHeader[header][valueIndex])
				return temp
			})
			
			return {
				statusCode: 200 , body: JSON.stringify(values)
			}
		}
}
} 