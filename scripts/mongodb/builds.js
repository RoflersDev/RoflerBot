const {Schema, model, models} = require('mongoose');

const schema = new Schema({
	_id: {
		type: Number,
		required: true,
	},
    build: {
        type: String,
        required: true,
    },
	price: {
		type: Number,
		required: true,
		default: 150,
	},
})
const name = "builds"
module.exports = models[name] || model(name, schema);