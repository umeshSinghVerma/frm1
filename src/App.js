import "./App.css";
import Flight from "./components/Flight";
import {
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Multi from "./components/Multi";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/" element={<Flight/>}/>
      <Route path="/multi" element={<Multi />} />
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
