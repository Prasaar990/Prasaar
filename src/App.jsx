import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer";
import Main from "./components/main/Main";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import GetStarted from "./components/main/GetStarted";
import Terms from "./components/main/Terms";
import InitialForm from "./components/main/RedinessForm";
import VocAssessment from "./components/main/VOC";
import VoeAssessment from "./components/main/VOE";
import PrivacyPolicy from "./components/main/privacy";
import ContactUs from "./components/main/ContactUs";
import AboutUs from "./components/main/AboutUs";
import PaymentPage from "./components/main/Payment";
import PaymentSuccessPage from "./components/main/PaymentSuccesspage";
import ElectionPage from "./components/main/ElectionPage";
import TNPage from "./components/main/TNPage";
import { LanguageProvider } from "./contexts/LanguageContext";
import ZPPayment from "./components/main/ZPPayment";
import VidhanSabhaPayment from "./components/main/VidhanSabhaPayment";
import ImageCreationPage from "./components/main/ImageCreationPage";

// Admin Components
import Login from "./components/admin/Login";
import AdminLayout from "./components/admin/AdminLayout";
import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/admin/Profile";
import PublicCanvasPage from "./components/main/PublicCanvasPage";

// Layout wrapper for public pages (with Header/Footer)
const PublicLayout = () => {
  const location = useLocation();
  // Don't show Header/Footer for admin routes
  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/login';
  
  if (isAdminRoute) {
    return <Outlet />;
  }
  
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

// Admin route wrapper
const AdminRoutes = () => {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes with Header/Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Main />} />
            <Route path="/election" element={<ElectionPage />} />
            <Route path="/form" element={<GetStarted />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/customer-trust" element={<VocAssessment />} />
            <Route path="/employee-trust" element={<VoeAssessment />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/readiness-check" element={<InitialForm />} />
            <Route path="/success" element={<PaymentSuccessPage />} />
            <Route path="/zp/pay" element={<PaymentPage />} />
            <Route path="/pay" element={<PaymentPage />} />
            <Route path="/zp" element={<ZPPayment />} />
            <Route path="/assembly" element={<VidhanSabhaPayment />} />
            <Route path="/tn" element={<TNPage />} />
            <Route path="/tnpoll" element={<TNPage />} />
            <Route path="/test" element={<ImageCreationPage />} />
            
            {/* Public Canvas Page for clients */}
            <Route path="/tn/:client_id" element={<PublicCanvasPage />} />
          </Route>

          {/* Admin Login (no Header/Footer) */}
          <Route path="/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<AdminRoutes />}>
            <Route index element={<Dashboard />} />
            <Route path="clients" element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<ElectionPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}
export default App;
