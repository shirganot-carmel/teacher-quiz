'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('questions', [{
      quest: 'what is the color of the sky?',
      answer: "blue",
      questionnaireId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      quest: "what is the color of tree?",
      answer: "brown",
      questionnaireId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('questions', null, {});
  }
};
