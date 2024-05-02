const router = require('express').Router();

const apiSpotsRouter = require('./api/spotRoutes');
const apiUserRouter = require('./api/userRouter');
const apiTokensRouter = require('./api/tokensRouter');

router.use('/api/spot', apiSpotsRouter);
router.use('/api/auth', apiUserRouter);
router.use('/api/tokens', apiTokensRouter);

module.exports = router;
