const mongoose = require('mongoose')
const autoIncrementModelID = require('./counterModel');

const threadSchema = new mongoose.Schema({
    title: String,
    author: String,
    content: String,
    replies: [{
        author: String,
        content: String
    }]
}, {__v: false});

// threadSchema.pre('save', function (next) {
//     if (!this.isNew) {
//         next();
//         return;
//     }
//     autoIncrementModelID('threads', this, next)

// });

module.exports = mongoose.model("Thread", threadSchema);