import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { BlogProvider } from "./componments/Context/BlogContext";
import { ClubsProvider } from "./componments/Context/ClubContext.jsx";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <BlogProvider>
    <ClubsProvider>
      <ClerkProvider publishableKey={publishableKey}>
        <App />
      </ClerkProvider>
    </ClubsProvider>
  </BlogProvider>
);

