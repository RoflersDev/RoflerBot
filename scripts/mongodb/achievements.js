const {Schema, model, models} = require('mongoose');

const schema = new Schema({
	_id: {
		type: Number,
		required: true,
	},
    tag: {
        type: String,
        required: true,
    },
    name: {
        type: Object,
        required: true,
    },
    description: {
        type: Object,
        required: true
    }
})
const name = "achievements"
module.exports = models[name] || model(name, schema);