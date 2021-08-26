import React from 'react';
import './Board.css';
import Square from '../Square/Square';

class Board extends React.Component {
    
    constructor (props){
      super(props);
        this.renderSquare = this.renderSquare.bind(this);
    }

    
    renderSquare(i) {
      return <Square 
      position={i} 
      value = {this.props.squares[i]}
      onClick = {this.props.handleClickSquare} />;
    }
  
   
    render() {
      return (
        <div>
          <div className="board-row">
            {this.renderSquare(0)}
            {this.renderSquare(1)}
            {this.renderSquare(2)}

          </div>
          <div className="board-row">
            {this.renderSquare(3)}
            {this.renderSquare(4)}
            {this.renderSquare(5)}
          </div>
          <div className="board-row">
            {this.renderSquare(6)}
            {this.renderSquare(7)}
            {this.renderSquare(8)}
          </div>
        </div>
      );
    }
  }

  export default Board;

