import {Schema}, mongoose from 'mongoose';

/* @@ Activity Type Model
 *
 * @ Description: An Activity Type defines how a activity proposal and vinculation must be.
 *
 * Read the docs to have a full description: /docs/atividade.br.md (in portuguese)
 * Mongoose Models documentation: http://mongoosejs.com/docs/models.html
 *
 * @ Log
 * Maradona Morais '2017-08-20 ': 
 */

const activityTypeSchema = new Schema({
	name: { // Activity Type name (e.g.: "Minicurso")
		type: String,
		required: true
	},
	slugName: { // Activity Type "URL slug" (e.g.: "mesa-redonda")
		type: String,
		required: true
	},
	description: String, // Activity Type brief description
	ofProposalRequiredFiles: [Schema.Types.Mixed], // Required files to make a proposal TODO: Create FileRequirement schema
	ofProposalRequiredFields: [Field], // Required fields to a proposal 
});

