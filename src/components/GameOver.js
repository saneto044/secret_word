import './GameOver.css'

export const GameOver = ({retry}) => {
  return (
    <div>
        <h2>GameOver</h2>
        <button onClick={retry} >Resetar Jogo</button>
    </div>
  )
}
