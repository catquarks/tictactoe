import React from 'react'

export default function EndOfGame(props){
  return(
    <div className='end-of-game'>
      { !props.draw ?
        <h2>{ props.winner } won!</h2> :
        <h2>It's a draw!</h2>        
      }
      <h3 onClick={ props.restartGame }>Play Again!</h3>
    </div>
  )
}
