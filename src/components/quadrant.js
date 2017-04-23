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

  const winningComboIncludesQuadId = Object.keys(props.winningCombo).includes(props.quadId)

  const quadClassName = props.quadId + " quadrant " + (winningComboIncludesQuadId ? "winner" : '')

  return(
    <div
      className={ quadClassName }
      onClick={ canBeClicked ? handleClick : null }
    >
      <span className='player'>{ props.clicked ? props.player : null }</span>
    </div>
  )
}
