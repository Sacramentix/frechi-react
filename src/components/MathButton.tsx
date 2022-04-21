import './MathButton.scss'

export const MathButton: React.FC<{value:string, onClick:()=>void}> = ({value, onClick}) => {
    return (
        <button className="math-button" onClick={onClick}>
            { value }
        </button>
    )  
}
