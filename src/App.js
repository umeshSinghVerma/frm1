import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./components/Home";
import Flight from "./components/Flight";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/flight" element={<Flight />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
