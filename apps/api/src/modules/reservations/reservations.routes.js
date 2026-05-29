const { Router } = require('express');
const { authMiddleware } = require('../../middlewares/auth.middleware');
const { createReservation, getMyReservations, cancelReservation } = require('./reservations.controller');

const router = Router();

router.use(authMiddleware);

router.post('/',       createReservation);
router.get('/',        getMyReservations);
router.delete('/:id',  cancelReservation);

module.exports = router;
