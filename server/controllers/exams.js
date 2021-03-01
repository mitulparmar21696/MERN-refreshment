const examService = require('../services/exams')
const Response = require('../utils/send-response')


exports.createExam = async function (req, res, next) {
    try {
        let exm = await examService.createExam(req.body)
        return Response.sendJsonResponse(req, res, 200, exm, "Success")
    } catch (exception) {
        console.log('exception', exception)
        return Response.sendJsonResponse(req, res, 500, {}, "Failure", exception)
    }
}