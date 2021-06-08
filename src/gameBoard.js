class GameBoard {

    constructor(){
        this.boardGrid = document.querySelector('.board');
    }

    updateUiBoard(array){
        this.boardGrid.innerHTML = array.map((val,i) =>{
            return `<div class="box" id="box_${val}" data-number="${val}"><p>${val === null ? '' : val}</p></div>`
        }).join('');
    }

    updateScore(score){
        const modal = document.querySelector('.modal');
        modal.querySelector('.score').innerHTML = score;
        modal.querySelector('.score').classList.add(`score_${score}`);
        modal.classList.add('animation-modal');
        setTimeout(()=>{
            modal.classList.remove('animation-modal');
            modal.querySelector('.score').classList.remove(`score_${score}`);
        },500);
    }
    

}

export default GameBoard