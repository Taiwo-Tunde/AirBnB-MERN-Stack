import { Route, Routes } from "react-router-dom";
import "./App.css";
import IndexPage from "./components/pages/IndexPage";
import LoginPage from "./components/pages/LoginPage";
import Layout from "./components/layout/layout";
import RegisterPage from "./components/pages/RegisterPage";
import UserContextProvider from "./components/UserContext";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:3000";
// axios.defaults.withCredentials =true

function App() {
  return (
    <UserContextProvider className="flex flex-col p-4 min-h-screen">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
