import './App.css';
import { useEffect, useState } from 'react';
import { getCurrentUsersPlaylists, getUserData } from './api/authorization_code_pkce';
import { setTokenRefreshTimeout, isTokenValid } from './api/spotifyToken';
import ListOfPlaylists from './components/lists_container/listOfPlaylists';
import ListOfNotAvailableSongs from './components/lists_container/listOfNotAvailableSongs';
import Header from './components/header';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);

  useEffect(() => {
    const checkTokenValid = () => {
      if (isTokenValid()) {
        setLoggedIn(true);
        setTokenRefreshTimeout();
      } else {
        setLoggedIn(false);
      }
    }
    checkTokenValid();
  }, []);

  useEffect(() => {
    const getUserProfile = async () => {
      if (loggedIn) {
        console.log('Ser ud til at brugeren er logget ind');
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
      <Header loggedIn={loggedIn}></Header>
      <h1>Have you been getting “This track is currently not available in your country”
      If you have a playlist with songs that are no longer available u can find the songs here</h1>
      <div className='lists-container'>
        <ListOfPlaylists headerText={"Your playlists"} data={userPlaylists} loggedIn={loggedIn}/>
        <ListOfNotAvailableSongs headerText={"Not available songs"} loggedIn={loggedIn} />
      </div>
      <footer></footer>
    </div>
  );
}

export default App;
