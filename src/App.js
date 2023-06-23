
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Forgot from "./components/Forgot";
import Password from "./components/Password";
import Register from "./components/Register";
import Activation from "./components/Activation";
import Dashboard from "./components/Dashboard";
import Redirect from "./components/Redirect";
import URLShortenerForm from "./components/URLShortenerForm";
export const url = "http://localhost:5000"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/active" element={<Activation />} />
          <Route path="/password" element={<Password />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/url" element={<Redirect />} />
          <Route path="/shorten" element={<URLShortenerForm />} />
          <Route path="*" element={<Navigate to='/login' />} />





        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;