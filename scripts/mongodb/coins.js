const {mongoose, Schema, model, models} = require('mongoose');

const schema = new Schema({
	_id: {
		type: mongoose.Types.Decimal128,
		required: true,
	},
	username:{
		type: String,
		required: true,
	},
	servers: {
		type: Array,
		required: true,
	},
	stats: { 
		type: Object,
		required: true,
	},
})
const name = "coinsCountB"
module.exports = models[name] || model(name, schema);