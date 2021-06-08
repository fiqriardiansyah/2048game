import Control from './src/control.js';
import Logic from './src/logic.js';
import GameBoard from './src/gameBoard.js';
// import Data from './src/data.js';

const control = new Control();
const logic = new Logic();
const gameBoard = new GameBoard();

control.windowReload();

control.getEventKeyControl((key)=>{
    logic.action(key)
    gameBoard.updateUiBoard([...logic.getArrayBox()[0],...logic.getArrayBox()[1],...logic.getArrayBox()[2],...logic.getArrayBox()[3]])
    
})

