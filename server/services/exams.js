const examModel = require('../models/exams')


exports.createExam = async function (exam) {
    try {
        let userDetails = await examModel.create(exam);
        return userDetails;
    } catch (exception) {

    }
}