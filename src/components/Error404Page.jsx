import { AnimatedError } from "./animation"
import "../styles/error.scss"

const Error404Page = () => {
  return (
    <div className="error">
      <AnimatedError>
        <h2 className="error-title">404</h2>
        <p className="error-text">Страница не найдена :(</p>
      </AnimatedError>
    </div>
  )
}

export default Error404Page
