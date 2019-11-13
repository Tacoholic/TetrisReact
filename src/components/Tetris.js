import React, { useState } from 'react';

//This is helping when starting a new game, this creates a new game 
import { createStage, checkCollision } from '..//gameHelpers';

//components
import StartButton from './StartButton';
import Stage from './Stage';
import Display from './Display';

//style components
import { StyledTetris, StyledTetrisWrapper } from './styles/StyledTetris'; 

//custom hooks

import { usePlayer } from '../hooks/usePlayer';
import { useStage } from '../hooks/useStage';

//we'll be adding braces because we will be adding more logic to it. 

const Tetris = () => {
    const[dropTime, setDropTime] = useState(null);
    const[gameOver, setGameOver] = useState(false);

    const[player, updatePlayerPos, resetPlayer, playerRotate] = usePlayer();
    const[stage, setStage] = useStage(player, resetPlayer);


console.log('re-render')

const movePlayer = dir => {

    //this means if we don't collide with anything, we can do the move
    if(!checkCollision(player, stage, { x: dir, y: 0})) {
           //this makes the left/right movement
        updatePlayerPos({ x: dir, y: 0 });
    }
 
    


}

const startGame = () => {
    //reseteverything
    setStage(createStage());
    resetPlayer();
    setGameOver(false);
}

const drop = () => {
    if(!checkCollision(player, stage, {x: 0, y:1 })){
            //this updates the players position.
    updatePlayerPos({ x: 0, y: 1, collided: false })
    } else{
        //GameOver
        if (player.pos.y < 1 ){
            console.log("gameover");
            setGameOver(true);
            setDropTime(null);
        }
        updatePlayerPos({x: 0, y: 0, collided: true })
    }
}

const dropPlayer = () => {
    drop();
}

//this is going to be the callback function for when you press the keys on the keyboard
const move = ({ keyCode }) => {
    if (!gameOver) {
        if (keyCode === 37) {
            movePlayer(-1);
        } else if (keyCode === 39) {
            movePlayer(1)
        } else if (keyCode === 40) {
            dropPlayer();
        } else if (keyCode === 38) {
            playerRotate(stage, 1);
        }
    }
}
    return(
        <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
            <StyledTetris>
            <Stage stage={stage} />
            <aside>
            {gameOver ? (
                <Display gameOver={gameOver} text="Game Over" />
            ) : (
            <div>
                <Display text="Score" />
                <Display text="Rows" />
                <Display text="Level" />
            </div>
            )}
            <StartButton callback={startGame} />
            </aside>
            </StyledTetris>
        </StyledTetrisWrapper>
    )
}

export default Tetris;