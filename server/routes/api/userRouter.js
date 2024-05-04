const { Router } = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs/promises');
const sharp = require('sharp');
require('dotenv').config();
const { User } = require('../../db/models');
const generateTokens = require('../../utils/generateTokens');
const cookiesConfig = require('../../config/cookiesConfig');
const verifyRefreshToken = require('../../middlewares/verifyRefreshToken');
const upload = require('../../middlewares/multerMiddleware');

const router = Router();

router.post('/signup', upload.single('file'), async (req, res) => {
  // eslint-disable-next-line object-curly-newline
  const { username, email, password, tel, role = 'user' } = req.body;

  if (username && email && password) {
    try {
      // проверяем наличие файла
      if (!req.file) {
        return res.status(400).json({ message: 'File not found' });
      }
      // создаем имя файла с расширением webp и привязкой к дате
      const imgName = `${Date.now()}.webp`;
      // создаем буфер с помощью sharp
      const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();
      // создаем файл с помощью fs
      await fs.writeFile(`./public/img/${imgName}`, outputBuffer);
      // создаем юзера в бд
      const [user, created] = await User.findOrCreate({
        where: { email },
        defaults: {
          username,
          password: await bcrypt.hash(password, 10),
          img: `http://${process.env.DB_HOST}:${process.env.PORT}/img/${imgName}`,
          tel,
          role,
        },
      });

      if (!created) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const plainUser = user.get();
      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      return res
        .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
        .status(200)
        .json({ accessToken, user: plainUser });
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(500);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (email && password) {
    try {
      const user = await User.findOne({
        where: { email },
      });

      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Incorrect password' });
      }

      const plainUser = user.get();
      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      return res
        .cookie('refreshToken', refreshToken, cookiesConfig.refresh)
        .status(200)
        .json({ accessToken, user: plainUser });
    } catch (e) {
      console.log(e);
      return res.sendStatus(500);
    }
  }
  return res.sendStatus(500);
});

router.get('/logout', (req, res) => {
  res.clearCookie('refreshToken').sendStatus(200);
});

router.get('/check', verifyRefreshToken, (req, res) => {
  res.json({ user: res.locals.user });
});

module.exports = router;
