const { exec } = require("child_process");

module.exports = {
  //build
  build: function (site) {
    const {
      category,
      name,
      tel,
      address,
      whatsappNumber,
      description,
      palette,
      style,
      type,
      timeTable,
      products,
      categories,
    } = site;

    //creates boilerplate from template
    //exec(`npx create-react-app ${name} --template ${category}`);

    //modify config file with user params

    console.log(site);
  },

  //bundle
  bundle: function () {},

  //deploy
  deploy: function () {},
};
