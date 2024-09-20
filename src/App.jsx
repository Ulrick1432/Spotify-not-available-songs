import './App.css';
import { useEffect, useState } from 'react';
import { redirectToSpotifyAuthorize, getCurrentUsersPlaylists, getUserData, getUsersSavedTracks } from './api/authorization_code_pkce';
import Lists from './components/lists_container/lists';

function App() {

  // localStorage.getItem('code_verifier') returns Null if not exists
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('code_verifier'));
  const [userProfile, setUserProfile] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [userSavedTracks, setUserSavedTracks] = useState([]);

  const handleClickLogin = async () => {
    if (!loggedIn) {
      await redirectToSpotifyAuthorize();
    }
  };

  const handleClickLogUd = async () => {
    if (loggedIn) {
      localStorage.clear();
      setLoggedIn(false);
    }
  };

  useEffect(() => {
    const getUserProfile = async () => {
      if (loggedIn) {
        console.log('Ser ud til at brugeren er logget ind');
        console.log(localStorage.getItem('code_verifier'));
        const response = await getUserData();
        setUserProfile(response);
      }
    }
    getUserProfile();
  }, [loggedIn]);

  useEffect(() => {
    const getPlaylists = async () => {
      if (loggedIn) {
        const response = await getCurrentUsersPlaylists();
        setUserPlaylists(response);
      }
    }
    getPlaylists()
  
  }, [loggedIn]);

  // useEffect(() => {
  //   const getUserSavedTracks = async () => {
  //     if (loggedIn) {
  //       const response = await getUsersSavedTracks();
  //       setUserSavedTracks(response);
  //     }
  //   }
  //   getUserSavedTracks();
  // }, [loggedIn]);
  
  return (
    <div className="App">
      <header className="App-header">
      {loggedIn === null ? <button onClick={ () => handleClickLogin() }>Spotify login</button> :
      <button onClick={() => handleClickLogUd()}>log ud</button>}
      </header>
      <h1>Have you been getting “This track is currently not available in your country”
      If you have a playlist with songs that are no longer available u can find the songs here</h1>
      <div className='lists-container'>
        <Lists headerText={"Your playlists"} nameOfItem={"Item 1"} data={userPlaylists} showLikedSongs={true} loggedIn={loggedIn}/>
        <Lists headerText={"Not available songs"} nameOfItem={"Item 1"} loggedIn={loggedIn} showNotAvailableSongs={true} />
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
