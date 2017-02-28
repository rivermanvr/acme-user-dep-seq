const router = require('express').Router();
const acmeDB = require( '../db' );

router.post('/', (req, res, next) => {
    if (req.body.name) {
        acmeDB.models.Department.addDeptName(req.body.name)
            .then(res.redirect( '/' ))
    } else {
        res.redirect( '/' )
    }
})

module.exports = router;
