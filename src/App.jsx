import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'

const TURNS = {
    X: "x",
    O: "o"
}

const board = Array(9).fill(null)

function App() {

  return (
    <main className='board'>
        <h1>Ta Te Ti</h1>
        <section className='game'>
            {
            board.map((el, index) => {
                return (
                    <div className='cell'>
                        <span>
                        {index}
                        </span>
                    </div>
                    )
            })
            }
        </section>
    </main>
  )
}

export default App
