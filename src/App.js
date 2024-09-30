import "bootstrap/dist/css/bootstrap.min.css";
import Router from "./Routes";
import { ProfileImageProvider } from "./Hooks/createContext";
function App() {

  return (
    <ProfileImageProvider>
      <div className="App">
        <Router />
      </div>
    </ProfileImageProvider>
  );
}

export default App;
