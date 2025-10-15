import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
// Mantine kütüphanesi kaldırıldı, sadece child component'ler Mantine kullanacak
import "./index.css"; // Basit stiller için index.css dosyasını dahil ettik

const Home = () => (
  <div className="container">
    <h1>Parent - Home</h1>
    <p>Navigation üzerinden Child projelerini yükleyin.</p>
    <nav>
      <Link to="/child1">
        <button className="btn">Child 1</button>
      </Link>
      <Link to="/child2">
        <button className="btn" style={{ marginLeft: 8 }}>
          Child 2
        </button>
      </Link>
    </nav>
  </div>
);

// Remote componentleri lazy-load ediyoruz (vite-plugin-federation import syntax)
const RemoteChild1 = React.lazy(() => import("child1/App"));
const RemoteChild2 = React.lazy(() => import("child2/App"));

function App() {
  return (
    // MantineProviderWrapper kaldırıldı
    <BrowserRouter>
      <Suspense fallback={<div>Loading remote...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/child1" element={<RemoteChild1 />} />
          <Route path="/child2" element={<RemoteChild2 />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

createRoot(document.getElementById("root")).render(<App />);
