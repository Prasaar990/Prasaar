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
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header />
                <Main />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/form"
            element={
              <>
                <Header />
                <GetStarted />
                <Footer />
              </>
            }
          ></Route>
          <Route
            path="/terms"
            element={
              <>
                <Header />
                <Terms />
                <Footer />
              </>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
