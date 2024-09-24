import { redirectToSpotifyAuthorize } from '../api/authorization_code_pkce';
const Header = ({ loggedIn }) => {

  console.log(`loggedIn value in header ${loggedIn}`)

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
        <button onClick={() => handleClickLogin() }>Spotify login</button> :
        <button onClick={() => handleClickLogUd()}>log ud</button>
      }
    </header>
  )
};

export default Header;