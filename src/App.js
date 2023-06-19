import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <div className="w-full bg-gradient-to-b from-black to-neutral-700 min-h-screen">
      {/* routes */}
      <BrowserRouter>
        <Routes>
          {/* home page */}
          <Route path="/" element={<Home />} />

          {/* movie details page */}
          <Route path="/movies/:imdbID" element={<MovieDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
