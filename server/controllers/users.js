const userService = require('../services/users')
const Response = require('../utils/send-response')
const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');


exports.createUsers = async function (req, res, next) {
    try {
        let userDetails = req.body
        bcrypt.hash(userDetails.password, saltRounds, async function (err, hash) {
            // Store hash in your password DB.

            let userDetailsObj = {
                name: userDetails.name,
                email: userDetails.email,
                password: hash,
                role: userDetails.role
            }
            let user = await userService.createUser(userDetailsObj);
            let teacher = {}
            let student = {}

            if (userDetails.role === 2) {
                let teacherDetails = {
                    grade_id: userDetails.grade_id,
                    user_id: user._id,
                    subject_id: userDetails.subject_id
                }
                teacher = await userService.createTeachers(teacherDetails)
            } else {
                let studentDetails = {
                    grade_id: userDetails.grade_id,
                    user_id: user._id,
                    selected_subjects: []
                }
                student = await userService.createStudents(studentDetails)
            }

            return Response.sendJsonResponse(req, res, 200, { ...user, ...teacher, ...student }, "Success")
        });


    } catch (exception) {
        console.log('exception', exception)
        return Response.sendJsonResponse(req, res, 500, {}, "Failure", exception)
    }
}

exports.signInUser = async function (req, res, next) {
    try {
        let userDetails = req.body

        let user = await userService.findUser(userDetails)
        if (user) {
            // Load hash from your password DB.
            bcrypt.compare(userDetails.password, user.password, async function (err, result) {
                if (result) {
                    var token = jwt.sign({ _id: user._id, role: user.role }, 'test');
                    let updateUser = await userService.updateUser(user, { auth: token })
                    return Response.sendJsonResponse(req, res, 200, { auth: token }, "Success")
                } else {
                    return Response.sendJsonResponse(req, res, 401, {}, "failure", true)
                }
            });

        } else {
            return Response.sendJsonResponse(req, res, 404, {}, "not found", true)
        }




    } catch (exception) {
        console.log('exception', exception)
        return Response.sendJsonResponse(req, res, 500, {}, "Failure", exception)
    }
}



exports.getUsers = async function (req, res, next) {
    try {
        let type = req.params.type;
        console.log('type', type)
        type = type === 'teacher' ? 2 : 3;
        let user = await userService.getUserList(type)
        return Response.sendJsonResponse(req, res, 200, user, "Success")

    } catch (exception) {
        console.log('exception', exception)
        return Response.sendJsonResponse(req, res, 500, {}, "Failure", exception)
    }
}