import { useState } from 'react'
import './App.css'

export default function App() {
  const [grid, setGrid] = useState(Array(10).fill(Array(10).fill(null)));
  const [player, setPlayer] = useState("H");
  const [gameState, setGameState] = useState("Player horizontal turn.");

  function checkWin(){
    const otherPlayer = player==="H"?"V":"H"; 
    for(let i = 0; i < 10; i++){
      for(let j = 0; j < 9; j++){
        if(otherPlayer==="H"&&!grid[i][j]&&!grid[i][j+1]){
          return false;
        }else if(otherPlayer==="V"&&!grid[j][i]&&!grid[j+1][i]){
          return false;
        }
      }
    }
    let winner = player==="H"?"horizontal":"vertical";
    setGameState(`Player ${winner} wins!`);
    return true;
  }

  function handleCellClick(rowNum, colNum){
    console.log(rowNum, colNum);
    const newGrid = grid.map((row)=>[...row]);
    if(player==="H"&&colNum+1<10&&!grid[rowNum][colNum]&&!grid[rowNum][colNum+1]){
      newGrid[rowNum][colNum] = "H";
      newGrid[rowNum][colNum+1] = "H";
      setGrid(newGrid);
      setPlayer("V");
      setGameState("Player vertical turn.");
    }else if(player==="V"&&rowNum+1<10&&!grid[rowNum][colNum]&&!grid[rowNum+1][colNum]){
      newGrid[rowNum][colNum] = "V";
      newGrid[rowNum+1][colNum] = "V";
      setGrid(newGrid);
      setPlayer("H");
      setGameState("Player horizontal turn.");
    }else{
      setGameState(`Invalid move from player ${player}.`)
      return;
    }
    if(checkWin()){
      return;
    }
  }


  return (
    <div className="App">
      <h1>Domineering game</h1>
      <p>{gameState}</p>
      <div className="board">
        {
          grid.map((row,rowIndex) => 
            (row.map((cell, colIndex)=>
                <div className={`cell ${cell}`} onClick={()=>handleCellClick(rowIndex,colIndex)}>
                  
                </div>
              )
            )
          )
        }
      </div>
    </div>
  )
}
