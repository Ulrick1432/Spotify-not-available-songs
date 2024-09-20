import { useSelector } from 'react-redux';
import './lists.css';
import { useEffect, useState } from 'react';


const ListOfNotAvailableSongs = ({ headerText, loggedIn }) => {
  const [tracks, setTracks] = useState([])
  const [notAvailableSongs, setNotAvailableSongs] = useState([]);

  const savedTracks = useSelector(state => state.tracks.value);
  console.log(`This is savedTracks = ${savedTracks}`);

  useEffect(() => {
    console.log('Tracks updated:', tracks);
    if (tracks.length > 0) {
      const checkTracksAvailability = () => {
        let notAvailableTracks = [];
        
        tracks.forEach((track) => {
          const availableMarkets = track.track.available_markets;
          if (availableMarkets && availableMarkets.length > 0 && !availableMarkets.includes("DK")) {
            notAvailableTracks.push(track.track.name);
          }
        });
  
        console.log('Not available songs:', notAvailableTracks); // Debugging
        setNotAvailableSongs(notAvailableTracks);
      };
  
      checkTracksAvailability();
    } else {
      console.log('Tracks array is empty, skipping availability check.');
    }
  }, [tracks]);

  return (
    <div className='container'>
      <h2 className='header-text'>{headerText}</h2>
      <div className='items-container'>
        {notAvailableSongs.length > 0 && loggedIn ? (
          notAvailableSongs.map((trackName, index) => (
            <button
              key={index}
              className='button-item'
            >
              {trackName}
            </button>
          ))
        ) : (
          <p>No unavailable songs to display.</p>
        )}
      </div>
    </div>
  )

}

export default ListOfNotAvailableSongs;