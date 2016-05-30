'use strict mode'

module.exports = function(Room) {
  var app = require('../../server/server');

  Room.remoteMethod(
    	'game',
    	{
        http: {path: '/game', verb: 'get'},
        returns: {arg: 'game', type: 'Object'}
    	})

  Room.game = function(cb) {

    "use strict"
    const nbr = 3
    let combinaison = {
      nbr: nbr
    }

    var Bullshit = app.models.Bullshit;

    Bullshit.find(function(err, bullshits) {
      bullshits = bullshits.map(function(bullshit){
        return bullshit.word
      })
      let rand, line = [], column
      for(let indexligne=0; indexligne<combinaison.nbr; indexligne++){
        column = []
        for(let indexcolumn=0; indexcolumn<combinaison.nbr; indexcolumn++){
          rand = bullshits[Math.floor(Math.random() * bullshits.length)];
          bullshits = bullshits.filter(function(bullshit){
            return bullshit !== rand
          })
          column.push(rand)
        }
        line.push(column)
      }
      combinaison.value = line
      cb(null, combinaison)
    })
  }
}
