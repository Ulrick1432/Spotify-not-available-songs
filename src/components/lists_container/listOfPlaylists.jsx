import './lists.css';
import { getPlaylistItems, getUsersSavedTracks } from '../../api/authorization_code_pkce';
import { useDispatch } from 'react-redux';
import { replaceInitialState } from '../../utils/tracks';
import { useState } from 'react';

const ListOfPlaylists = ({ headerText, data = null, loggedIn, setLoadingListOfNotAvailableSongs}) => {
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState(null);

  const handleClickPlaylists = async (index, playlist_id, totalTracksInPlaylist) => {
    setLoadingListOfNotAvailableSongs(true);
    console.log(`Jeg har klikket på en playlist & playlist_id = ${playlist_id} totalTracksInPlaylist${totalTracksInPlaylist}`);
    setActiveButton(index);
    try {
      if (totalTracksInPlaylist > 50) {

      let totalSongs = 0
      let totalSongsLeft = 0
      let tracksToKeepTrackOf = []
      let offset = 0
      let limit = 50
      console.log('Jeg har klikket på liked Songs playlist');
  
      // While total amount of songs in liked- / saved tracks playlist is not equal the amount of track returned
      // Loops through ones without checking conditions
      do {
        console.log(`
          TotalSongs = ${totalSongs}
          TotalSongsLeft = ${totalSongsLeft}
          offset = ${offset}
          limit = ${limit}`
        )
  
        const response = await getPlaylistItems(playlist_id, totalTracksInPlaylist);
        // Sets totalLikedSongs equal to the total amount of tracks/songs in the liked playlist
        totalSongs = response.total;
  
        // Push each track/song to the tracksToKeepTrackOf array
        for (let index = 0; index < response.items.length; index++) {
          const item = response.items[index];
          tracksToKeepTrackOf.push(item);
        }
  
        offset += limit;
        totalSongsLeft = totalSongs - offset;
  
        // if there is less than 50 songs/tracks left it
        // changes the limit of amount of songs to how many tracks there are left to request.
        if (totalSongsLeft < 50) {
          limit = totalSongsLeft;
        }
        
        if (totalSongsLeft <= 0) {
          console.log('All liked songs have been processed.');
          break;
        }
        
      } while (totalSongs !== offset);
      
      dispatch(replaceInitialState(tracksToKeepTrackOf));

      } else {
        const response = await getPlaylistItems(playlist_id, totalTracksInPlaylist);
        dispatch(replaceInitialState(response.items));
      }
      
    } catch(err) {
      console.error('error getting playlist items from API');
    } finally {
      setLoadingListOfNotAvailableSongs(false);
    }
  };

  const handleClickLikedSongs = async () => {
    setLoadingListOfNotAvailableSongs(true);
    setActiveButton('liked-songs'); // Special key for Liked Songs button
    
    try {
      let totalLikedSongs = 0
      let totalLikedSongsLeft = 0
      let tracksToKeepTrackOf = []
      let offset = 0
      let limit = 50
      console.log('Jeg har klikket på liked Songs playlist');
  
      // While total amount of songs in liked- / saved tracks playlist is not equal the amount of track returned
      // Loops through ones without checking conditions
      do {
        console.log(`
          TotalLikedSongs = ${totalLikedSongs}
          TotalLikedSongsLeft = ${totalLikedSongsLeft}
          offset = ${offset}
          limit = ${limit}`
        )
  
        const response = await getUsersSavedTracks(limit, offset);
        // Sets totalLikedSongs equal to the total amount of tracks/songs in the liked playlist
        totalLikedSongs = response.total;
  
        // Push each track/song to the tracksToKeepTrackOf array
        for (let index = 0; index < response.items.length; index++) {
          const item = response.items[index];
          tracksToKeepTrackOf.push(item);
        }
  
        offset += limit;
        totalLikedSongsLeft = totalLikedSongs - offset;
  
        // if there is less than 50 songs/tracks left it
        // changes the limit of amount of songs to how many tracks there are left to request.
        if (totalLikedSongsLeft < 50) {
          limit = totalLikedSongsLeft;
        }
        
        if (totalLikedSongsLeft <= 0) {
          console.log('All liked songs have been processed.');
          break;
        }
        
      } while (totalLikedSongs !== offset);
  
      dispatch(replaceInitialState(tracksToKeepTrackOf));
    } catch(err) {
      console.error('error getting playlist items from API');
    } finally {
      setLoadingListOfNotAvailableSongs(false);
    }

  };
  
  return (
    <div className='container'>
      <h2 className='header-text'>{headerText}</h2>
      <div className='items-container'>
        {loggedIn ? 
          <button 
            className={`button-item ${activeButton === 'liked-songs' ? 'active' : ''}`}
            onClick={() => handleClickLikedSongs()}
          >
            Liked songs
          </button> : 
        null}
        {data && Array.isArray(data.items) && data.items.length > 0 ? (
          data.items.map((playlist, index) => (
            <button 
              key={index} 
              className={`button-item ${activeButton === index ? 'active' : ''}`}
              onClick={() => handleClickPlaylists(index, playlist.id, playlist.tracks.total)}
            >
              {playlist.name}
            </button>
          ))
        ) : (
          <>
          {headerText === "Your playlists" ? 
            <h1>No playlists available</h1> : 
            <h1>Login to get spotify playlists</h1>
          }
          </>
        )}
      </div>
    </div>
  );
};

export default ListOfPlaylists;
