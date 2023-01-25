import { useState } from 'react'
import './App.css'
import confetti from "canvas-confetti"
import Square from './component/Square'
import { TURNS } from "./constants"
import { checkWinner, checkEndGame } from './logic/board'
import WinnerModal from './component/WinnerModal'

function App() {

    const [board, setBoard] = useState(() => {
        const boardFromStorage = window.localStorage.getItem("board")
        return boardFromStorage ? JSON.parse(boardFromStorage) 
                                : Array(9).fill(null)
    })

    const [turn, setTurn] = useState(() => {
        const turnFromStorage = window.localStorage.getItem("turn")
        return turnFromStorage ?? TURNS.X
    })

    const [winner, setWinner] = useState(null)

    const resetGame = () => {
        setBoard(Array(9).fill(null))
        setTurn(TURNS.X)
        setWinner(null)

        window.localStorage.removeItem("board")
        window.localStorage.removeItem("turn")
    }

    const updateBoard = (index) => {
        // no actualizamos esta posicion si tiene algo
        if (board[index] || winner) return
        // actualizar el tablero
        const newBoard = [ ... board]
        newBoard[index] = turn
        setBoard(newBoard)
        console.log(newBoard);
        // cambiar el turno
        const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
        setTurn(newTurn)
        // guardar partida
        window.localStorage.setItem("board", JSON.stringify(newBoard))
        window.localStorage.setItem("turn", newTurn)
        // revisar si hay ganador
        const newWinner = checkWinner(newBoard)
        if (newWinner) {
            confetti()
            setWinner(newWinner)
        } else if (checkEndGame(newBoard)) {
            setWinner(false) // empate
        }
        // console.log(winner)
    }

  return (
    <main className='board'>
        <h1>Ta Te Ti</h1>
        <button onClick={resetGame}>Reset del juego</button>
        <section className='game'>
            {
            board.map((square, index) => {
                return (
                    <Square
                        key={index}
                        index={index}
                        updateBoard={updateBoard}>
                            {square}
                    </Square>
                )
            })
            }
        </section>

        <section className='turn'>
            <Square isSelected={turn === TURNS.X}>
                {TURNS.X}
            </Square>
            <Square isSelected={turn === TURNS.O}>
                {TURNS.O}
            </Square>
        </section>

        <WinnerModal winner={winner} resetGame={resetGame} />
    </main>
  )
}

export default App
