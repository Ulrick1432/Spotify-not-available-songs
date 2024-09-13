import './lists.css';
const Lists = ( { headerText, nameOfItem } ) => {
  return(
    <div className='container'>
      <h2 className='header-text'>{headerText}</h2>
      <div className='items-container'>
      <button className='button-item'>{nameOfItem}</button>
      </div>
    </div>
  )
}

export default Lists;