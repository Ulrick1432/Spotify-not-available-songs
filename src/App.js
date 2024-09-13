import './App.css';
import Lists from './components/lists_container/lists';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Have you been getting “This track is currently not available in your country”
        If you have a playlist with songs that are no longer available u can find the songs here</h1>
      </header>
      <body>
        <div className='lists-container'>
          <Lists headerText={"Your playlists"} nameOfItem={"Item 1"}/>
          <Lists headerText={"Not available songs"} nameOfItem={"Item 1"}/>
        </div>
      </body>
      <footer></footer>
    </div>
  );
}

export default App;
