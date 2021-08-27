import React from 'react';
import './Game.css';
import Board from '../Board/Board';

class Game extends React.Component {
  
      constructor (props) {
        super(props);
          this.state ={
          
          history: [{squares: Array(9).fill('')}],
          nextStep: 'X',
          currentStep: 0,
          isFinish: false
          };
          this.calculateWinner = this.calculateWinner.bind(this);
        this.clickSquare = this.clickSquare.bind(this);
        this.showButtonsHistory = this.showButtonsHistory.bind(this);
        this.jumpTo = this.jumpTo.bind(this);
          }
        
     calculateWinner(squares) {
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return true;
        }
      }
      return false;
    }

    clickSquare(i){
      const {history} = this.state;
      const currentSquearesCopy = history[history.length -1].squares;

        let isFinish;
        if(currentSquearesCopy[i] === '' && !this.state.isFinish ) {
          currentSquearesCopy [i] = this.state.nextStep;
        isFinish = this.calculateWinner(currentSquearesCopy);
        this.setState(state=>{
          const { history, nextStep}= state;
            return {
              squares:currentSquearesCopy,
              history:history.concat({squares: currentSquearesCopy}),
               nextStep: isFinish ? nextStep : nextStep === 'X' ? '0' : 'X',
               currentStep: history.length,
               isFinish
            };
                
            });
            console.log('history', this.state.history);
          }
    }

    jumpTo (step) {
       this.setState ({currentStep:step});
    }

     showButtonsHistory()  {
       return this.state.history.map((step, index) => {
       return (<li>
         <button onClick={() => this.jumpTo(index)}>Перейти на ход {index + 1}</button>
       </li>
       );
       });
    }
  
render(){
  const {history, nextStep, isFinish} = this.state;
  let status;
  if (isFinish) {
    status = 'Игра закончилась. Выиграли ' + nextStep;
  }else {
    status = 'Следующий ход: ' + nextStep;
  }

  const currentSqueares = history[history.length -1].squares;
  const buttonsHistory = this.showButtonsHistory();


      const startNewGame = () => {
        return (
          <button className= 'startbtn' onClick={() => startNewGame
            (Array(9).fill(''))}>Очистить поле</button>
        )
      }


      return (
        <div className='game'>
          <div className='game-board'>
          <div className="status">{status}</div>
            <Board
            squares = {currentSqueares}
            history = {history}
            nextStep = {nextStep}
            isFinish = {isFinish}
            handleClickSquare ={this.clickSquare}
            />
            {startNewGame()}
          </div>

          <div className="game-info">
            
            <ul>
              {buttonsHistory}
            </ul>
          </div>
        </div>
      );
    }
  }
  

export default Game;
