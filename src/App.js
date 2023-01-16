import { Route, Routes } from "react-router-dom";
import AllUsers from "./component/AllUsers";
import Home from "./component/Home";


function App() {
  return (
    <div >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<AllUsers />} />
      </Routes>
    </div>
  );
}

export default App;
