const {Schema, model, models} = require('mongoose');

const schema = new Schema({
	_id: {
		type: Number,
		required: true,
	},
    username: {
        type: String,
        required: true,
    },
	coinsCount: {
		type: Number,
		required: true,
		default: 150,
	},
	buildingsCount: { 
		type: Number,
		required: true,
		default: 0,
	},
})
const name = "coinsCountB"
module.exports = models[name] || model(name, schema);