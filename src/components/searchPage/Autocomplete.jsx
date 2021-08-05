import { useEffect } from "react"
import { motion, AnimateSharedLayout } from "framer-motion"

const Autocomplete = ({
  autocompleteArray,
  close,
  clickSubmit,
  activeClass,
  setActiveClass,
}) => {
  useEffect(() => {
    const keyUpDownHanlder = (e) => {
      if (e.key === "ArowDown" || e.key === "ArrowUp") {
        e.preventDefault()
      }
      if (e.key === "ArrowDown") {
        activeClass > autocompleteArray.length - 2
          ? setActiveClass(0)
          : setActiveClass(activeClass + 1)
      }
      if (e.key === "ArrowUp") {
        activeClass <= 0
          ? setActiveClass(autocompleteArray.length - 1)
          : setActiveClass(activeClass - 1)
      }
    }
    window.addEventListener("keydown", keyUpDownHanlder)
    return () => {
      window.removeEventListener("keydown", keyUpDownHanlder)
    }
  }, [activeClass, setActiveClass, autocompleteArray])

  const mouseHanlder = (e) => {
    setActiveClass(+e.target.dataset.id)
  }

  return (
    <>
      <AnimateSharedLayout>
        <motion.ul layout className="autocomplete" onMouseMove={mouseHanlder}>
          {autocompleteArray.map((item, index) => {
            return (
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={activeClass === index ? "active" : null}
                key={index}
                onClick={clickSubmit}
                data-id={index.toString()}
              >
                {item.name}
              </motion.li>
            )
          })}
        </motion.ul>
      </AnimateSharedLayout>
      <div className="autocomplete-container" onClick={close}></div>
    </>
  )
}

export default Autocomplete
