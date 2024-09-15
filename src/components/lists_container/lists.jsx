import './lists.css';

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

const Lists = ({ headerText, nameOfItem, data = null }) => {
  return (
    <div className='container'>
      <h2 className='header-text'>{headerText}</h2>
      <div className='items-container'>
        {data && Array.isArray(data.items) && data.items.length > 0 ? (
          data.items.map((playlist, index) => (
            <button key={index} className='button-item'>{playlist.name}</button>
          ))
        ) : (
          <button className='button-item'>{nameOfItem}</button>
        )}
      </div>
    </div>
  );
};

export default Lists;
