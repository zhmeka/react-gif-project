const SearchResultInfo = ({ results, text }) => {
  return (
    <>
      <div className="search-panel-result">
        Результаты по запросу <span>"{text}"</span>:
      </div>
      {!results && <NotFound />}
    </>
  )
}

const NotFound = () => {
  return (
    <div className="not-found">
      <h2>Ничего не найдено...</h2>
    </div>
  )
}

export default SearchResultInfo
