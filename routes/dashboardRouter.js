var express = require('express');
const { 
     dashboardGet,
     dashboardPost,
     dashboardUpdate,
     dashboardDelete,
     dashboarGETSinglePost, 
     dashboardPostGet,
     getComments
    } = require('../controllers/adminDashboardController');
const admin = require('../middlewares/admin');
var router = express.Router();

router.get('/dashboard', admin, dashboardGet)
router.get('/dashboard/create', admin, dashboardPostGet)
router.get('/dashboard/messages', admin, getComments)
router.post('/dashboard/create', admin, dashboardPost)
router.get('/dashboard/:slug', admin, dashboarGETSinglePost)
router.delete('/dashboard/:slug', admin, dashboardDelete)
router.put('/dashboard/:slug', admin, dashboardUpdate)

module.exports = {path:'/', router};
