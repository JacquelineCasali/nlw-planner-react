import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Error from "../pages/Error";
import TripDetails from "../pages/TripDetails";

export default function AppRoutes() {
  return (
    <Router>
     

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/trips/:tripId" element={<TripDetails />} />
      <Route path="*" element={<Error />}></Route>
    </Routes>


  </Router>
  )
}
