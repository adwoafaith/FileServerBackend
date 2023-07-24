const mongoose = require('mongoose')
const Schema = mongoose.Schema;

//upload schema
const businessDistributionSchema = new Schema({
    title: {
        type: String,
        unique: true
    },
    description: {
        type: String,
    },
    file_url: {
        type: String,
    },
    format: {
        type: String,
    },
    emailCount: {
        type: Number,
        default: 0
    },
    downloadCount: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const businessDistribution = mongoose.model('businessDistribution', businessDistributionSchema)

module.exports = businessDistribution