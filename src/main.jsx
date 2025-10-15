import React, { Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { MantineProvider, Container, Button } from "@mantine/core";

const Home = () => (
  <Container>
    <h1>Parent - Home</h1>
    <p>Navigation üzerinden Child projelerini yükleyin.</p>
    <nav>
      <Link to="/child1">
        <Button>Child 1</Button>
      </Link>
      <Link to="/child2">
        <Button style={{ marginLeft: 8 }}>Child 2</Button>
      </Link>
    </nav>
  </Container>
);

// Remote componentleri lazy-load ediyoruz (vite-plugin-federation import syntax)
const RemoteChild1 = React.lazy(() => import("child1/App"));
const RemoteChild2 = React.lazy(() => import("child2/App"));

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Suspense fallback={<div>Loading remote...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/child1" element={<RemoteChild1 />} />
            <Route path="/child2" element={<RemoteChild2 />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </MantineProvider>
  );
}

createRoot(document.getElementById("root")).render(<App />);
