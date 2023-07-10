const {mongoose, Schema, model, models} = require('mongoose');

// const schema = new Schema({
// 	_id: {
// 		type: mongoose.Types.Decimal128,
// 		required: true,
// 	},
//     username: {
//         type: String,
//         required: true,
//     },
// 	coinsCount: {
// 		type: Number,
// 		required: true,
// 		default: 150,
// 	},
// 	buildingsCount: { 
// 		type: Object,
// 		required: true,
// 	},
// 	timings: { 
// 		type: Object,
// 		required: true,
// 	},
// })
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