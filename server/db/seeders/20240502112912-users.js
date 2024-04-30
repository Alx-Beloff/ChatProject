/** @type {import('sequelize-cli').Migration} */
const bcrypt = require('bcrypt');

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
          password: await bcrypt.hash('123', 11),
          img: 'https://i.siteapi.org/9Fu_gIz7bXiyNhfBS7KV0ABHzI0=/0x36:500x436/center/top/filters:fill(transparent):format(png)/ca6b8ca1a6c0173.s.siteapi.org/img/cc8f31fc0ed4ed61d64c2926a26166c16f93ce95.jpg',
          tel: '+7 (777) 777 77-77',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Петр Петров',
          email: 'p@p',
          password: await bcrypt.hash('123', 11),
          img: 'https://peterburg.center/sites/default/files/0-peter-1.jpg',
          tel: '+7 (111) 111 11-11',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'Иван Иванов',
          email: 'i@i',
          password: await bcrypt.hash('123', 11),
          img: 'https://xsgames.co/randomusers/assets/avatars/male/46.jpg',
          tel: '+7 (915) 121 21-22',
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
