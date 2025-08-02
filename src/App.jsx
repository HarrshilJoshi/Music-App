import { Routes, Route } from 'react-router-dom';
import SignIn from './components/SignIn';
import Player from './components/Player';
import Favourites from './components/favourites';
import RequireAuth from './RequireAuth';
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";

function PrivateRoute({ children }) {
  const user = auth.currentUser;
  return user ? children : <Navigate to="/" replace />;
}


function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      {/* <Route path="/player" element={<RequireAuth><Player /></RequireAuth>} /> */}
       <Route path="/" element={<SignIn />} />
  <Route
    path="/player"
    element={
      <PrivateRoute>
        <Player />
      </PrivateRoute>
    }
  />
      <Route path="/favourites" element={<RequireAuth><Favourites /></RequireAuth>} />
    </Routes>
  );
}

export default App;
