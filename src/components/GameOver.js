import './GameOver.css'

export const GameOver = ({retry, score}) => {
  return (
    <div>
        <h1>Fim do Jogo!</h1>
        <h2>
          a sua pontuação foi: <span>{score}</span>
        </h2>
        <button onClick={retry} >Resetar Jogo</button>
    </div>
  )
}
