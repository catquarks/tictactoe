import React, { Component } from 'react'
import update from 'immutability-helper'
import Quadrant from './components/quadrant'
import EndOfGame from './components/end_of_game'
import Byline from './components/byline'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      currentPlayer: 'x',
      gameOver: false,
      draw: false,
      winner: '',
      winningCombo: {},
      q1: '',
      q2: '',
      q3: '',
      q4: '',
      q5: '',
      q6: '',
      q7: '',
      q8: '',
      q9: '',
      possibleCombos: [
        {'q1': null, 'q2': null, 'q3': null},
        {'q4': null, 'q5': null, 'q6': null},
        {'q7': null, 'q8': null, 'q9': null},
        {'q1': null, 'q4': null, 'q7': null},
        {'q2': null, 'q5': null, 'q8': null},
        {'q3': null, 'q6': null, 'q9': null},
        {'q1': null, 'q5': null, 'q9': null},
        {'q7': null, 'q5': null, 'q3': null},
      ]
    }
  }

  getNextPlayer(){
    if (this.state.currentPlayer === 'x'){
      return 'o'
    } else if (this.state.currentPlayer === 'o'){
      return 'x'
    }
  }

  clickQuad(quad){
    const currentPlayer = this.state.currentPlayer
    const nextPlayer = this.getNextPlayer()
    var newState = {}
    newState[quad] = currentPlayer
    newState['currentPlayer'] = nextPlayer

    this.isThereAWinner(quad, currentPlayer)
    this.setState(newState)
  }

  isThereAWinner(quad, player){
    const possibleCombos = [...this.state.possibleCombos]

    const newPossibleCombos = possibleCombos.filter( combo => {
      // add player to every possible combo
      if (combo[quad] !== undefined){
        combo[quad] = player
      }
      
      // check if the values of each possible combo are all the same player
      // if values are all the same player, that player is the winner
      const valuesString = Object.values(combo).toString()

      if (valuesString === "x,x,x") {

        this.setState({
          gameOver: true,
          winner: 'x',
          winningCombo: combo
        })
      } else if (valuesString === "o,o,o") {

        this.setState({
          gameOver: true,
          winner: 'o',
          winningCombo: combo
        })
      }

      // if a possible combo includes both players, remove combo from possible combos
      if (valuesString.includes('x') && valuesString.includes('o')){
        return false
      }

      return true
    })

    // if all possible combos are null, it's a draw
    if (newPossibleCombos.length === 0){
      this.setState( {draw: true, gameOver: true} )
    }
  }

  restartGame(){
    const newState = update(this.state, {
      currentPlayer: { $set: 'x'},
      gameOver: { $set: false},
      draw: { $set: false},
      winner: { $set: ''},
      winningCombo: { $set: {} },
      q1: { $set: ''},
      q2: { $set: ''},
      q3: { $set: ''},
      q4: { $set: ''},
      q5: { $set: ''},
      q6: { $set: ''},
      q7: { $set: ''},
      q8: { $set: ''},
      q9: { $set: ''},
      possibleCombos: {
        0: { q1: {$set: null}, q2: {$set: null}, q3: {$set: null} },
        1: { q4: {$set: null}, q5: {$set: null}, q6: {$set: null} },
        2: {q7: {$set: null}, q8: {$set: null}, q9: {$set: null} },
        3: {q1: {$set: null}, q4: {$set: null}, q7: {$set: null} },
        4: {q2: {$set: null}, q5: {$set: null}, q8: {$set: null} },
        5: {q3: {$set: null}, q6: {$set: null}, q9: {$set: null} },
        6: {q1: {$set: null}, q5: {$set: null}, q9: {$set: null} },
        7: {q7: {$set: null}, q5: {$set: null}, q3: {$set: null} }             
      }
    })

    this.setState(newState)
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Tic Tac Toe</h1>
          { !this.state.gameOver ?
            <h2><strong>Status:</strong> It's { this.state.currentPlayer }'s turn!</h2> :
            <EndOfGame
              draw={ this.state.draw }
              winner={ this.state.winner }
              restartGame={ this.restartGame.bind(this) }
            />
          }  
          <Byline />
        </div>
        <div className='grid'>
          { [1,2,3,4,5,6,7,8,9].map( quad => {
            var quadNum = 'q' + quad
            return(
             <Quadrant
              clickQuad={ this.clickQuad.bind(this) }
              quadId={ quadNum }
              player={ this.state[quadNum] }
              key={ quad }
              clicked={ this.state[quadNum] === '' ? false : true }
              gameOver={ this.state.gameOver }
              winningCombo={ this.state.winningCombo }
             />
           )
          }) }
        </div>
      </div>
    )
  }
}

export default App
