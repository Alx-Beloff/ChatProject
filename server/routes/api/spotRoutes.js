const router = require('express').Router();
const { Spot } = require('../../db/models');
// const verifyAccessToken = require('../../middlewares/verifyAccessToken');

router.get('/', async (req, res) => {
  try {
    const spots = await Spot.findAll();
    res.status(200).json(spots);
  } catch ({ message }) {
    res.status(400).json({ message });
  }
});

// router.get('/restaurants/:id', async (req, res) => {
//   try {
//     const { id } = req.params;
//     const restaurant = await Restaurant.findOne({ where: { id } });
//     res.status(200).json(restaurant);
//   } catch ({ message }) {
//     res.status(400).json({ message });
//   }
// });

// router.get('/:restaurantId', async (req, res) => {
//   try {
//     const { restaurantId } = req.params;
//     const restaurant = await Restaurant.findOne({
//       where: { id: restaurantId },
//     });
//     res.status(200).json(restaurant);
//   } catch ({ message }) {
//     res.status(400).json({ message });
//   }
// });

// router.delete('/:restaurantId', async (req, res) => {
//   console.log(req.params);
//   try {
//     const { restaurantId } = req.params;
//     const result = await Restaurant.destroy({ where: { id: restaurantId } });
//     if (result > 0) {
//       res.status(200).json({ message: 'success' });
//       return;
//     }
//     throw new Error();
//   } catch ({ message }) {
//     res.status(400).json({ message });
//   }
// });

// router.post('/', verifyAccessToken, async (req, res) => {
//   try {
//     const { title, description, image } = req.body;
//     const restaurant = await Restaurant.create({
//       title,
//       description,
//       image,
//       userId: res.locals.user.id,
//     });
//     res.status(201).json(restaurant);
//   } catch ({ message }) {
//     res.json({ message });
//   }
// });

// router.put('/:restaurantId', async (req, res) => {
//   try {
//     const { restaurantId } = req.params;
//     const { title, description, image } = req.body;
//     await Restaurant.update(
//       {
//         title,
//         description,
//         image,
//       },
//       { where: { id: restaurantId } },
//     );

//     const restaurant = await Restaurant.findByPk(restaurantId);
//     res.status(200).json(restaurant);
//   } catch ({ message }) {
//     res.status(400).json({ message });
//   }
// });

// module.exports = router;
