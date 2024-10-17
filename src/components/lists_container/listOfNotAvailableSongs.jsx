import { useSelector } from 'react-redux';
import './lists.css';
import { useEffect, useState } from 'react';


const ListOfNotAvailableSongs = ({ headerText, loggedIn }) => {
  const [tracksHasUpdated, setTracksHasUpdated] = useState(false);
  const [tracks, setTracks] = useState([])
  const [notAvailableSongs, setNotAvailableSongs] = useState([]);

  const savedTracks = useSelector(state => state.tracks.value);

  // Set tracks only if savedTracks.items exists
  useEffect(() => {
    setTracksHasUpdated(true);
    if (savedTracks && Array.isArray(savedTracks)) {
      setTracks(savedTracks);
    } else {
      setTracks([]);
    }
  }, [savedTracks]);
  
  useEffect(() => {
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
    }
  }, [tracks]);

  return (
    <div className='container'>
      <h2 className='header-text'>{headerText}</h2>
      <div className='items-container'>
        {Array.isArray(notAvailableSongs) && notAvailableSongs.length > 0 && loggedIn ? (
          notAvailableSongs.map((trackName, index) => (
            <button
              key={index}
              className='button-item not-available-songs'
            >
              {trackName}
            </button>
          ))
        ) : (
          <>
          {tracksHasUpdated && loggedIn ? <h1>There are not "no available songs" in that playlist</h1> : 
            <>
              <h1>No unavailable songs</h1>
              <h1>Select a playlist</h1>
            </>
          }
          </>
        )}
      </div>
    </div>
  )

}

export default ListOfNotAvailableSongs;