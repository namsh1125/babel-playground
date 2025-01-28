import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/common/Header";
import Footer from "./components/layout/common/Footer";
import LandingPage from "./pages/LandingPage";
import PlaygroundPage from "./pages/PlaygroundPage";
import TransformationProcessPage from "./pages/TransformationProcessPage";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow px-4 py-8 bg-slate-50 min-h-[calc(100vh-140px)]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/playground" element={<PlaygroundPage />} />
          <Route
            path="/transform-process"
            element={<TransformationProcessPage />}
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
