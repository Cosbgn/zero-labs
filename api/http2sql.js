const { Sequelize } = require('sequelize');

// Supported Databases 
const mysql2 = require('mysql2'); 
const mariadb = require("mariadb")
const pg = require("pg")
const tedious = require("tedious")

exports.handler = async ( event , context ) => {
	const {body, httpMethod} = event
	if (httpMethod !== "POST") {
		return { statusCode: 405, body: "Method Not Allowed - Please send a POST request instead" };
	}
	const {uri, auth, params, config_object, query} = JSON.parse(body)
	const p = params || []
	if (!query){
		return { statusCode: 400, body: "You need to pass a valid SQL query" };
	}

	// if (!uri && !config_object){
	// 	return { statusCode: 400, body: "You need to pass either a valid uri or a auth object for sequelize" };
	// }
	
	try {
		let seq;
		if (uri){
			seq = new Sequelize(uri.toString(), ...p)
		} else {
			seq = new Sequelize(...p)
		}
		const [results, metadata] = await seq.query(query)
		return { statusCode: 200, body: JSON.stringify(results) };
	}
	catch(e) {
		return { statusCode: 400, body: e.message };
	}
} 