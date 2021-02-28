var express = require('express');
var router = express.Router();
const SubjectController = require('../controllers/subject')

/* GET users listing. */
router.get('/', SubjectController.getSubjectList);

module.exports = router;
