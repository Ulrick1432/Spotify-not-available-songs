-------------------------------------------TODO------------------------------------------
* TEST -> Gør så loading spinner har sort baggrund og grøn "loading"
* Tilføj en tekst der kommer frem i Songs not available når der klikkes på en playlist der har mere end 100 tracks.
  - Teksten kan fx være "Der er en bug i Spotify public API - som gør at det ikke er muligt at få tracks fra playlists der har flere end 100 sange"
* Tilføj en footer component
  - Hvad skal der stå???


---------------------- BUG i "Get Playlist Items" API hos spotify -----------------------

https://community.spotify.com/t5/Spotify-for-Developers/Get-playlist-items-documented-limit-is-incorrect/m-p/5619233#M10225
Nedenstående virker ikke 

Dine favoritsange i 2022 → https://api.spotify.com/v1/playlists/6ia3xAedpsBYjfdaGJ4Icz/tracks?offset=0&limit=595
De bedste → https://api.spotify.com/v1/playlists/4EKTCb8wSlHrlRHWoVenun/tracks?offset=0&limit=325
Frankrig → https://api.spotify.com/v1/playlists/6ia3xAedpsBYjfdaGJ4Icz/tracks?offset=0&limit=595

Alle får fejl ↓
{
  "error": {
    "status": 401,
    "message": "No token provided"
  }
}

Nedenstående virker fint
https://api.spotify.com/v1/playlists/37i9dQZF1E34VWg45GlRWa/tracks?offset=0&limit=50

https://api.spotify.com/v1/playlists/37i9dQZF1DWYnwbYQ5HnZU/tracks?offset=0&limit=95

Ser ud til at "https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks" -
har en limit på 100 items i playlist, så hvis der er flere end 100 tracks i playlisten får man fejlen...
ER DET VIRKELIG MENINGEN OG HVOR STÅR DET I DERES DOKUMENTATION=????

--------------------------------------------------------------------------------------------

Når der klikkes på et at playlisterne skal den gå i gennem alle "Songs" og retuner i anden liste
Hvilke song der ikke længere er tilgænge lig i users region. 

Hvordan gøres dette? 
https://developer.spotify.com/documentation/web-api/reference/get-playlists-tracks

response af overnstående for at se, hvilke lande sangen er tilgængelig i. 
response.items[].track.album.available_markets = return fx ["CA", "BR", "IT"]
Hvis "DK" ikke er tilgængelig i array'en er det ikke en sang der er tilgængelig i Danmark. 
det samlet resultat kan gemmes i localStorage så daten kan indsætte fra App.jsx til Lists -
over sange for den klikkede playlist der IKKE er tilgænge i Danmark.

Måske skal man have liked songs via en anden Spotify API.
https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
  

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
