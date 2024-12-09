import { Routes, Route } from "react-router-dom"; 

import Footer from "./components/footer";
import Header from "./components/header";
import MainPage from "./pages/MainPage";
import MyAccount from "./pages/myAccount";
import PetsAdd from "./pages/petsAdd";
import PetsSearch from "./pages/petsSearch";

function App() {
  return (
    <div className="w-100">
      <Header />
      <div >
        <Routes> 
          <Route path="/" element={<MainPage />} />
          <Route path="/myAccount" element={<MyAccount />} />
          <Route path="/petsAdd" element={<PetsAdd />} />
          <Route path="/petsSearch" element={<PetsSearch />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
