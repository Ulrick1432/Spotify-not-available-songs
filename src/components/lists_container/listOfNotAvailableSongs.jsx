import { useSelector } from 'react-redux';
import './lists.css';
import { useEffect, useState, forwardRef } from 'react';
import LoadingSpinner from '../loadingSpinner/loadingSpinner';


const ListOfNotAvailableSongs = forwardRef((props, ref) => {
  const [tracksHasUpdated, setTracksHasUpdated] = useState(false);
  const [tracks, setTracks] = useState([])
  const [notAvailableSongs, setNotAvailableSongs] = useState([]);
  const [loading, setLoading] = useState(false);
  const savedTracks = useSelector(state => state.tracks.value);

  // Set tracks only if savedTracks.items exists
  useEffect(() => {
    setLoading(true);
    setTracksHasUpdated(true);
    if (savedTracks && Array.isArray(savedTracks)) {
      setTracks(savedTracks);
    } else {
      setTracks([]);
    }
    setLoading(false);
  }, [savedTracks]);
  
  useEffect(() => {
    if (tracks.length > 0) {
      setLoading(true);
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
      setLoading(false);
    }
  }, [tracks]);

  return (
    <div ref={ref} className='container'>
      <h2 className='header-text'>{props.headerText}</h2>
      {loading || props.loadingListOfNotAvailableSongs ? <LoadingSpinner className='loading-spinner'/> : 
        <div className='items-container'>
          {props.tooManyTracksInPlaylist ? (
            <h3>The playlist has more than 100 tracks/songs. Spotify API can't handle that because of bug.</h3>
          ) : Array.isArray(notAvailableSongs) && notAvailableSongs.length > 0 && props.loggedIn ? 
            (
              notAvailableSongs.map((trackName, index) => (
                <button
                  key={index}
                  className='button-item not-available-songs'
                >
                  {trackName}
                </button>
              ))
            ) : 
            (
              <>
              {tracksHasUpdated && props.loggedIn ? <h1>There are not "no available songs" in that playlist</h1> : 
              (
                <>
                  <h1>No unavailable songs</h1>
                  <h1>Select a playlist</h1>
                </>
              )
              }
              </>
            )
          }
        </div>
      }
    </div>
  )
})

export default ListOfNotAvailableSongs;