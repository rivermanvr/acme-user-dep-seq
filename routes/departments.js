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

router.delete('/:id', (req, res, next) => {
    console.log(req.params.id);
    acmeDB.models.Department.delDeptID(req.params.id)
        .then(res.redirect( '/' ))
})

module.exports = router;
