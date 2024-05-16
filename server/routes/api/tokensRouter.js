const { Router } = require('express');
const verifyRefreshToken = require('../../middlewares/verifyRefreshToken');
const generateTokens = require('../../utils/generateTokens');
const cookiesConfig = require('../../config/cookiesConfig');

const router = Router();

router.get('/refresh', verifyRefreshToken, async (req, res) => {
  try {
    const { accessToken, refreshToken } = generateTokens({
      user: res.locals.user,
    });

    res
      .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
      .status(200)
      .json({ accessToken, user: res.locals.user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Что-то пошло не так' });
  }
});

module.exports = router;
