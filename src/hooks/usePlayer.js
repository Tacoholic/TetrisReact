//useState will return an array with two items in them, which in this case are player and setPlayer
import { useState, useCallback } from 'react';

import { TETROMINOS, randomTetromino } from '../tetrominos';
import { STAGE_WIDTH } from '../gameHelpers';

//Thanks to ES6, we don't have to use whats below: 
    //const playerState = useState();
    //const player = playerState[0]
    //const setPlayer = playerState[1]

//instead we can use what's below on lines 14    
export const usePlayer = () => {
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0].shape,
    collided: false,
  });

   //create the updatePlayerPos function that takes in an object(x,y,collided) 
   const updatePlayerPos = ({ x, y, collided }) => {
     //here,  player is moving, so we are setting the state because we are setting player state 
      //In order to achieve this, we need the previous state.
      //we added parenthesis so it won't confuse it for an object
      setPlayer(prev => ({
        ...prev,
        //below, we are adding values to the state. 
        pos: { x: (prev.pos.x += x), y: (prev.pos.y += y)},
        collided,
      }))
    }

    const resetPlayer = useCallback(() => {
      setPlayer({
        pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
        tetromino: randomTetromino().shape,
        collided: false,
      })
    }, [])
  
    return [player, updatePlayerPos, resetPlayer];
  }
//we are returning the player because we are importing the hook(usePlayer)
//into the tetris component and thrn we are going to need the player 
//in the component 