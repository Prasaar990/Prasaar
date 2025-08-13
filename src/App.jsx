import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Main from "./components/main/Main";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetStarted from "./components/main/GetStarted";
import Terms from "./components/main/Terms";
import InitialForm from "./components/main/RedinessForm";
import VocAssessment from "./components/main/VOC";
import VoeAssessment from "./components/main/VOE";
import Election from "./components/main/Election";
import PrivacyPolicy from "./components/main/privacy";
import ContactUs from "./components/main/ContactUs";
import AboutUs from "./components/main/AboutUs";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path="/form" element={<GetStarted />}></Route>
          <Route path="/terms" element={<Terms />}></Route>
          <Route path="/privacy" element={<PrivacyPolicy />}></Route>
          <Route path="/customer-trust" element={<VocAssessment />}></Route>
          <Route path="/employee-trust" element={<VoeAssessment />}></Route>
          <Route path="/contact" element={<ContactUs />}></Route>
          <Route path="/about" element={<AboutUs />}></Route>
          <Route path="/election" element={<Election />}></Route>
          <Route path="/readiness-check" element={<InitialForm />}>
            {" "}
          </Route>
          <Route path="*" element={<Main />}>
            {" "}
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
