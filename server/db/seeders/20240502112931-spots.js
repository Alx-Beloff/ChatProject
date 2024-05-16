/** @type {import('sequelize-cli').Migration} */
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
      'Spots',
      [
        {
          name: 'ресторан "SIXTY"',
          address: 'Москва, Пресненская наб., 12 «Башня Федерация», 62 этаж',
          description:
            'Sixty – это ресторан Москвы высокого класса, открытый в 2011 году международной группой компаний Ginza project. Здесь посетители получают качественный сервис и вкусные изысканные блюда. Заведение славится своими панорамными видами на город, ведь оно находится на 62 этаже одного из небоскребов Москвы-сити и является самым высотным рестораном Европы.',
          img: 'https://kudamoscow.ru/uploads/8f728a64bebc516af88a80abd8a808f0.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'кафе "Шоколадница"',
          address: 'Москва, Ленинградский Проспект, 36',
          description:
            '«Шоколадница» — универсальная кофейня, которая всегда рада гостям. Это место для встречи с друзьями, и кафе, где удобно обсудить самое важное с бизнес-партнерами, и конечно же, это теплые ужины в кругу семьи и детей.',
          img: 'https://media-cdn.tripadvisor.com/media/photo-s/16/08/24/96/caption.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'бар "Дорогая, я перезвоню"',
          address: 'Москва, Пятницкий переулок, 2, 2 этаж',
          description:
            'В баре Дорогая, я перезвоню в ТЦ Пятницкий вы можете провести время за общением в компании или просто как следует отдохнуть после рабочего дня, в чём вам с удовольствием помогут наши опытные бармены и ассортимент алкоголя — мы приготовили напитки по вкусу и кошельку! Вам нужно только сообщить крепость и вкус (сладкий или горьковатый). Чтобы ваш бокал не пустовал, мы предлагаем большой выбор столовых и десертных вин из различных сортов винограда.',
          img: 'https://p1.zoon.ru/preview/800sRVXbPjADNIMSaWYKlQ/2400x1475x75/1/4/f/original_5444eab440c088f57a8b4843_5bd70bd58087c.jpg',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'бутекмп "Elbrus"',
          address: 'Москва, ул.Орджоникидзе, д. 11 стр. 10',
          description:
            'Эльбрус Буткемп — первая и самая крупная в России школа программирования в формате буткемпа.',
          img: 'https://sun9-41.userapi.com/impg/yeAev9lO7AwlfZhdfvf_-R8e00gQ0vecmPOwyg/azD-8C8bBuY.jpg?size=2560x2560&quality=95&sign=89b87f6fcea73e4739d006be269d362d&type=album',
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
