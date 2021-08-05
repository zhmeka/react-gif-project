import { AnimateLoader } from "./animation"
import "../styles/loader.scss"

const Loader = () => {
  return (
    <div className="loader">
      <AnimateLoader>
        <div className="loader-circle"></div>
      </AnimateLoader>
    </div>
  )
}

export default Loader
