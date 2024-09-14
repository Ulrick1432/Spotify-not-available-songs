import './App.css';
import { useEffect, useState } from 'react';
import { redirectToSpotifyAuthorize, getCurrentUsersPlaylists, getToken, getUserData } from './api/authorization_code_pkce';
import Lists from './components/lists_container/lists';

function App() {
  // localStorage.getItem('code_verifier') returns Null if not exists
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('code_verifier'));
  const [userProfile, setUserProfile] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState(null);

  const handleClickLogin = async () => {
    if (!loggedIn) {
      await redirectToSpotifyAuthorize();
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
  
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={ () => handleClickLogin() }>Spotify login</button>
      </header>
      <h1>Have you been getting “This track is currently not available in your country”
      If you have a playlist with songs that are no longer available u can find the songs here</h1>
      <body>
        <div className='lists-container'>
          <Lists headerText={"Your playlists"} nameOfItem={"Item 1"} data={userPlaylists}/>
          <Lists headerText={"Not available songs"} nameOfItem={"Item 1"}/>
        </div>
      </body>
      <footer></footer>
    </div>
  );
}

export default App;
