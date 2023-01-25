const Square = ({children, isSelected, updateBoard, index}) => {

    const className = `square ${isSelected ? "is-selected" : ""}`
    
    const handleClick = () => {
        updateBoard(index)
    }
    return (
        <divClic onClick={handleClick} className={className}>
            {children}
        </divClic>
    )
}

export default Square;