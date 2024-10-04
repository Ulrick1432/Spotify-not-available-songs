import { redirectToSpotifyAuthorize } from '../../api/authorization_code_pkce';
import './header.css';
const Header = ({ loggedIn }) => {

  const handleClickLogin = async () => {
    if (!loggedIn) {
      await redirectToSpotifyAuthorize();
    }
  };

  const handleClickLogUd = async () => {
    if (loggedIn) {
      localStorage.clear();
    }
  };

  return (
    <header className="App-header">
      {
        loggedIn === false || loggedIn === null ? 
        <button className='login-button' onClick={() => handleClickLogin() }>Spotify login</button> :
        <button className='logout-button' onClick={() => handleClickLogUd()}>log ud</button>
      }
      <h1>
        Have you been getting “This track is currently not available in your country”
        If you have a playlist with songs that are no longer available u can find the songs here.
      </h1>
    </header>
  )
};

export default Header;