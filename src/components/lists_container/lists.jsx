import './lists.css';

const Lists = ({ headerText, nameOfItem, data = null }) => {
  return (
    <div className='container'>
      <h2 className='header-text'>{headerText}</h2>
      <div className='items-container'>
        {data && Array.isArray(data.items) && data.items.length > 0 ? (
          data.items.map((playlist, index) => (
            <button key={index} className='button-item'>{playlist.name}</button>
          ))
        ) : (
          <button className='button-item'>{nameOfItem}</button>
        )}
      </div>
    </div>
  );
};

export default Lists;
