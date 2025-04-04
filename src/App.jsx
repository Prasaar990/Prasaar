import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Main from "./components/main/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetStarted from "./components/main/GetStarted";
import Terms from "./components/main/Terms";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/form" element={<GetStarted />}></Route>
          <Route path="/terms" element={<Terms />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
