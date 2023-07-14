const router = require('express').Router();
const customNotesRoutes = require('./customNotesRoute');

router.use(customNotesRoutes);

module.exports = router;
