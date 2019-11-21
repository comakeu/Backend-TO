
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('issues').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('issues').insert([
        {description: 'Too many potholes in our street', latitude: '60.564.21', longitude: '20.31.44', user_id:'1', imgURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Dirtroadpotholes.JPG/169px-Dirtroadpotholes.JPG'},
        {description: 'Lack of street lights', latitude: '20.432.122', longitude: '10.31.44', user_id:'2', imgURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Cycle_path_on_The_Roundway_Tottenham_London_England.jpg/220px-Cycle_path_on_The_Roundway_Tottenham_London_England.jpg'},
        {description: 'overgrown plants ', latitude: '11.22.33', longitude: '00.11.11', user_id:'3', imgURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ZjPbBAMf_YD6iJsdnOzkwE3fNH-IdyZOSQ3fgwpmM0lG5rpXag&s'},
        {description: 'Bad power transformer', latitude: '22.33.44', longitude: '44.44.44', user_id:'1', imgURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVcdaBtm-BeIpWkhgBOxIu9t61G7Uu6TZ9ZUUQADQzhbBUft3Baw&s'}
      ]);
    });
};
