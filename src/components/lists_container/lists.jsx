import './lists.css';
import { useDispatch } from 'react-redux';
import { addTracks } from '../../utils/playlistTracks';
import { getPlaylistItems, getUsersSavedTracks } from '../../api/authorization_code_pkce';
import { useEffect, useState } from 'react';

/* Når der klikkes på et at playlisterne skal den gå i gennem alle "Songs" og retuner i anden liste
   Hvilke song der ikke længere er tilgænge lig i users region. 
   
  Hvordan gøre dette? 
  https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks

  response af overnstående for at se, hvilke lande sangen er tilgængelig i. 
  response.items[].track.album.available_markets = return fx ["CA", "BR", "IT"]
  Hvis "DK" ikke er tilgængelig i array'en er det ikke en sang der er tilgængelig i Danmark. 
  det samlet resultat kan gemmes i localStorage så daten kan indsætte fra App.jsx til Lists -
  over sange for den klikkede playlist der IKKE er tilgænge i Danmark.

  Måske skal man have liked songs via en anden Spotify API.
  https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
  
*/

const Lists = ({ headerText, nameOfItem, data = null, showLikedSongs = null, loggedIn, showNotAvailableSongs }) => {
  const [tracks, setTracks] = useState([]);
  const [notAvailableSongs, setNotAvailableSongs] = useState([]);
  const dispatch = useDispatch();

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

    setTracks(tracksToKeepTrackOf);
    console.log(tracks);
  };

  const handleClickPlaylists = async (playlist_id, totalTracksInPlaylist) => {
    console.log('Jeg har klikket på en playlist');
    const response = await getPlaylistItems(playlist_id, totalTracksInPlaylist);
    setTracks(response.items);
  };

  // useEffect(() => {
  //   console.log('Tracks array = ', tracks);
  //   dispatch(addTracks(tracks));
  // }, [tracks]);
  

  useEffect(() => {
    if (tracks.length > 0) {
      const checkTracksAvailability = () => {
        let notAvailableTracks = []
      
        for (let index = 0; index < tracks.length; index++) {
          const availableMarkets = tracks[index].track.available_markets;
          // There is a bug with the reponse on tracks where the "available_markets" array is empty
          // if empty "available_markets" array the item is not pushed.
          if (!availableMarkets.includes("DK") && availableMarkets.length > 0) {
            notAvailableTracks.push(tracks[index].track.name);
            // console.log(tracks[index].track.name);
            // console.log(tracks[index].track.available_markets);
          }
        }

        setNotAvailableSongs(notAvailableTracks);
      }
      checkTracksAvailability();
    }
  }, [tracks]);

  console.log(notAvailableSongs);


  return (
    <div className='container'>
      <h2 className='header-text'>{headerText}</h2>
      <div className='items-container'>
        {showLikedSongs && loggedIn ? <button className='button-item' onClick={() => handleClickLikedSongs()}>Liked songs</button> : null}
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
          <button className='button-item'>{nameOfItem}</button>
        )}

        {showNotAvailableSongs && Array.isArray(notAvailableSongs) && notAvailableSongs.length > 0 ? (
          notAvailableSongs.map((trackName, index) => (
            <button
              key={index}
              className='button-item'
            >
              {trackName}
            </button>
          ))
        ) : (
          <></>
        )}

      </div>
    </div>
  );
};

export default Lists;
