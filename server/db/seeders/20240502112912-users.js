/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');
require('dotenv').config();

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          username: 'Admin',
          email: 'admin@spotchat.com',
          password: await bcrypt.hash('123456', 11),
          img: `http://${process.env.DB_HOST}:${process.env.PORT}/img/adminAvatar.jpeg`,
          tel: '+7 (777) 777 77-77',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Петр 1',
          email: 'petya1@spb.ru',
          password: await bcrypt.hash('123456', 11),
          img: 'https://obrazovaka.ru/wp-content/uploads/2014/08/Petr-I.jpg',
          tel: '+7 (111) 111 11-11',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Иван Иванов',
          email: 'v@mail.ru',
          password: await bcrypt.hash('123456', 11),
          img: `http://${process.env.DB_HOST}:${process.env.PORT}/img/seeduser1.jpeg`,
          tel: '+7 (915) 121 21-22',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Ирина',
          email: 'i@yandex.ru',
          password: await bcrypt.hash('123456', 11),
          img: `http://${process.env.DB_HOST}:${process.env.PORT}/img/seeduser2.jpeg`,
          tel: '+7 (953) 856 74-47',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
