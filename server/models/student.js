var mongoose = require('mongoose');

var studentsSchema = new mongoose.Schema({
    grade_id: String,
    selected_subjects: Array

}, {
    collection: 'students'
});
module.exports = mongoose.model('students', studentsSchema);