import './lists.css';
import { getPlaylistItems, getUsersSavedTracks } from '../../api/authorization_code_pkce';
import { useDispatch } from 'react-redux';
import { replaceInitialState } from '../../utils/tracks';

const ListOfPlaylists = ({ headerText, data = null, loggedIn, }) => {
  const dispatch = useDispatch();

  const handleClickPlaylists = async (playlist_id, totalTracksInPlaylist) => {
    console.log('Jeg har klikket på en playlist');
    const response = await getPlaylistItems(playlist_id, totalTracksInPlaylist);
    dispatch(replaceInitialState(response.items));
  };

  const handleClickLikedSongs = async () => {
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
  };
  
  return (
    <div className='container'>
      <h2 className='header-text'>{headerText}</h2>
      <div className='items-container'>
        {loggedIn ? <button className='button-item' onClick={() => handleClickLikedSongs()}>Liked songs</button> : null}
        {data && Array.isArray(data.items) && data.items.length > 0 ? (
          data.items.map((playlist, index) => (
            <button 
              key={index} 
              className='button-item' 
              onClick={() => handleClickPlaylists(playlist.id, playlist.tracks.total)}
            >
              {playlist.name}
            </button>
          ))
        ) : (
          <>
            <h1>No playlists available</h1>
            <h1>Login to get spotify playlists</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default ListOfPlaylists;
