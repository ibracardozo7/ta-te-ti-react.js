import { WINNER_COMBOS } from "../constants"

export const checkWinner = (boardToCheck) => {
    // revisamos todas las convinaciones ganadoras
    // para ver si Xo U gano
    for ( const combo of WINNER_COMBOS) {
        const [a, b, c] = combo
        if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[b] === boardToCheck[c]
        ) return boardToCheck[a]
    }
    // si no hay ganador
    return null
}

 export const checkEndGame = (newBoard) => {
    // revisamos si hay un empate
    // si no hay espacios vacios en el tablero
    return newBoard.every((square) => square !== null)
}