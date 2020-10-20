exports.handler = async ( event , context ) => {
	const {httpMethod, queryStringParameters} = event
	if (httpMethod !== "GET") {
		return { statusCode: 405, body: "Method Not Allowed" };
	}
	const embed = queryStringParameters.embed
	const decoded = embed ? decodeURIComponent(Buffer.from(embed, 'base64').toString('binary')) : "<p style='padding:30px; font-size:2rem; font-weight:bold'>'embed' parameter missing in the url query</p>"
	return {statusCode:200, body:decoded} //reply.type('text/html').send(decoded)
} 