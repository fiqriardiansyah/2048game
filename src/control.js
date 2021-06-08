import Data from './data.js';
import Logic from './logic.js';
import GameBoard from './gameBoard.js';

const logic = new Logic();
const gameBoard = new GameBoard();

class Control{

    getEventKeyControl(callback){
        document.addEventListener('keydown',(e)=>{
            callback(e.key)
        })
    }

    windowReload(){
        window.addEventListener('load',()=>{
            logic.setArrayBox(Data.arrayBox);
            logic.setHighScore(0);
            logic.randomPlaceNumber();
            gameBoard.updateUiBoard([...logic.getArrayBox()[0],...logic.getArrayBox()[1],...logic.getArrayBox()[2],...logic.getArrayBox()[3]]);
        })
    }

}



export default Control

