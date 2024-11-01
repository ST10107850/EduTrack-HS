import { createRoot } from "react-dom/client";
import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import App from "./App.tsx";
import App2 from "./App2.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
    {/* <App /> */}
    <App2 />
    
    </BrowserRouter>

  </AuthProvider>
);
