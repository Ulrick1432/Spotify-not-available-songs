import './App.css';
import { useEffect, useState, useRef } from 'react';
import { getCurrentUsersPlaylists, getUserData } from './api/authorization_code_pkce';
import { setTokenRefreshTimeout, isTokenValid } from './api/spotifyToken';
import ListOfPlaylists from './components/lists_container/listOfPlaylists';
import ListOfNotAvailableSongs from './components/lists_container/listOfNotAvailableSongs';
import Header from './components/header/header';
import LoadingSpinner from './components/loadingSpinner/loadingSpinner';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingListOfNotAvailableSongs, setLoadingListOfNotAvailableSongs] = useState(false);
  const [tooManyTracksInPlaylist, setTooManyTracksInPlaylist] = useState(false);
  const targetElementRef = useRef(null);

  console.log(`Loading = ${loading}`);

  useEffect(() => {
    const checkTokenValid = () => {
      if (isTokenValid()) {
        setLoggedIn(true);
        setTokenRefreshTimeout();
      } else {
        setLoggedIn(false);
      }
    };
    checkTokenValid();
  }, []);

  useEffect(() => {
    const getUserProfile = async () => {
      if (loggedIn) {
        setLoading(true);
        try {
          console.log('Fetching user profile...');
          const response = await getUserData();
          setUserProfile(response);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        } finally {
          setLoading(false); // Ensure loading is stopped even in case of an error
        }
      }
    };
    getUserProfile();
  }, [loggedIn]);

  useEffect(() => {
    const getPlaylists = async () => {
      if (loggedIn) {
        setLoading(true);
        try {
          console.log('Fetching playlists...');
          const response = await getCurrentUsersPlaylists();
          setUserPlaylists(response);
        } catch (error) {
          console.error('Error fetching playlists:', error);
        } finally {
          setLoading(false); // Stop loading when the request is complete or fails
        }
      }
    };
    getPlaylists();
  }, [loggedIn]);

  // Scroll to ListOfNotAvailableSongs
  const scollToListOfNotAvailableSongs = () => {
    if (targetElementRef.current) {
      targetElementRef.current.scrollIntoView({ behavior: 'smooth', block: 'start'});
    }
  };

  
  return (
    <div className="App">
      {loading ? <LoadingSpinner /> :
      <>
        <Header 
          loggedIn={loggedIn} 
          setLoggedIn={setLoggedIn} 
          setUserPlaylists={setUserPlaylists} 
          userProfile={userProfile}
        />  
        <div className='lists-container'>
          <ListOfPlaylists 
            headerText={"Your playlists"}
            data={userPlaylists} 
            loggedIn={loggedIn} 
            setLoadingListOfNotAvailableSongs={setLoadingListOfNotAvailableSongs}
            setTooManyTracksInPlaylist={setTooManyTracksInPlaylist}
            onClickScroll={scollToListOfNotAvailableSongs}
          />
          <ListOfNotAvailableSongs 
            headerText={"Not available songs"} 
            loggedIn={loggedIn} 
            loadingListOfNotAvailableSongs={loadingListOfNotAvailableSongs} 
            tooManyTracksInPlaylist={tooManyTracksInPlaylist}
            ref={targetElementRef}
          />
        </div>
        <footer></footer>
      </>
      }
    </div>
  );
}

export default App;

