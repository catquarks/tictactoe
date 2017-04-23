import React from 'react'

export default function Quadrant(props) {

  function handleClick(){
    props.clickQuad(props.quadId)
  }

  var canBeClicked = true

  if (props.clicked){
    canBeClicked = false
  }

  if (props.gameOver){
    canBeClicked = false
  }

  return(
    <div
      className={ props.quadId + " quadrant" }
      onClick={ canBeClicked ? handleClick : null }
    >
      <span className='player'>{ props.clicked ? props.player : null }</span>
    </div>
  )
}
