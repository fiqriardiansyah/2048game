import Data from './data.js';
import GameBoard from './gameBoard.js';

const gameBoard = new GameBoard();

class Logic {

    setArrayBox(multiArray){
        localStorage.setItem('arrayBox',JSON.stringify(multiArray));
    }

    getArrayBox(){
        return JSON.parse(localStorage.getItem('arrayBox'));
    }

    setHighScore(score){
        localStorage.setItem('highscore',score);
        if(score !== 0){
            gameBoard.updateScore(score);
        }
    }

    gameOver(){
        alert('game over');
        this.setArrayBox(Data.arrayBox);
        this.setHighScore(0);
    }

    checkScore(){
        const numbers = [...this.getArrayBox()[0],...this.getArrayBox()[1],...this.getArrayBox()[2],...this.getArrayBox()[3]].filter(num => num !== null);
        const max = Math.max(...numbers);
        if(localStorage.getItem('highscore') < max){
            this.setHighScore(max)
        }
    }

    action(event){
        if(event !== "ArrowUp" && event !== "ArrowDown" && event !== "ArrowRight" && event !== "ArrowLeft") return;
        
        // initial array box to localstorage
        if(!localStorage.getItem('arrayBox')){
            this.setArrayBox(Data.arrayBox)
        }

        switch(event){
            case "ArrowUp":
                this.upSwipe(this.getArrayBox());
                break;  
            case "ArrowDown":
                this.downSwipe(this.getArrayBox());
                break;
            case "ArrowRight":
                this.rightSwipe(this.getArrayBox());
                break;
            case "ArrowLeft":
                this.leftSwipe(this.getArrayBox());
                break;
        }

        this.checkScore();

        this.randomPlaceNumber();


    }

    sumAndGenerateNewRowArray(rowArray){

        const nonNullArray = [...rowArray].filter(el => el !== null);

        let identity = null;
        let newArray = [];

        for(let i = 0; i < nonNullArray.length ; i++){
            if(nonNullArray[i] === nonNullArray[i+1]){
                if(identity !== nonNullArray[i]){
                    newArray.push(nonNullArray[i] + nonNullArray[i+1]);
                    identity = nonNullArray[i];
                    i+=1;
                }
            }else{
                identity = null;
                newArray.push(nonNullArray[i]);
            }
        }

        return newArray;
        
    }

    upSwipe(array){
        const swipeArray = [];
        const newArray = [];
        const backToNormalArray = [];
        for(let i = 3; i>=0; i--){
            swipeArray.push([array[0][i],array[1][i],array[2][i],array[3][i]]);
        }
        for(let i = 0; i<4; i++){
            newArray.push(this.fillArrayWithNull(this.sumAndGenerateNewRowArray(swipeArray[i])));
        }
        for(let i = 0; i < 4; i++){
            backToNormalArray.push([newArray[3][i],newArray[2][i],newArray[1][i],newArray[0][i]]);
        }
        this.setArrayBox(backToNormalArray);
    }

    downSwipe(array){
        const swipeArray = [];
        const newArray = [];
        const backToNormalArray = [];
        for(let i = 0; i < 4; i++){
            swipeArray.push([array[3][i],array[2][i],array[1][i],array[0][i]]);
        }
        for(let i = 0; i<4; i++){
            newArray.push(this.fillArrayWithNull(this.sumAndGenerateNewRowArray(swipeArray[i])));
        }
        for(let i = 3; i>=0; i--){
            backToNormalArray.push([newArray[0][i],newArray[1][i],newArray[2][i],newArray[3][i]]);
        }
        this.setArrayBox(backToNormalArray);
    }

    rightSwipe(array){
        const newArray = [];
        const swipeArray = [];
        const backToNormalArray = [];
        for(let i = 3; i>=0;i--){
            swipeArray.push([array[i][3],array[i][2],array[i][1],array[i][0]]);
        }
        for(let i = 0; i<4; i++){
            newArray.push(this.fillArrayWithNull(this.sumAndGenerateNewRowArray(swipeArray[i])));
        }
        for(let i = 3; i>=0; i--){
            backToNormalArray.push([newArray[i][3],newArray[i][2],newArray[i][1],newArray[i][0]]);
        }
        this.setArrayBox(backToNormalArray);

    }

    leftSwipe(array){
        const newArray = [];
        for(let i = 0; i<4; i++){
            newArray.push(this.fillArrayWithNull(this.sumAndGenerateNewRowArray(array[i]),"left"));
        }
        this.setArrayBox(newArray);
    }

    fillArrayWithNull(array){
        const newArray = [];
        for(let i = 0; i<4; i++){
            newArray[i] = array[i] !== undefined ? array[i] : null;
        }
        return newArray;
    }
    
    randomPlaceNumber(){
        const array = [...this.getArrayBox()[0],...this.getArrayBox()[1],...this.getArrayBox()[2],...this.getArrayBox()[3]];
        if(array.includes(null)){
            const rndm = this.randomNumber(19);
            if(array[rndm] === null ){
                array[rndm] = this.generateNumber();
                this.setArrayBox(this.splitArray(array));
                return;
            }
            return this.randomPlaceNumber();
        }else{
            this.gameOver();
        }
    }

    generateNumber(){
        const number = [2,4,8,16];
        return number[this.randomNumber(4)];
    }

    randomNumber(number){
        if(number) return Math.round(Math.random() * number);
        return Math.round(Math.random());
    }

    splitArray(array){
        const size = 4; 
        const arrayOfArrays = [];
        for (let i=0; i<array.length; i+=size) {
            arrayOfArrays.push(array.slice(i,i+size));
        }
        return arrayOfArrays;
    }
    
}


export default Logic;