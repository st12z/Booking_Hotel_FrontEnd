import logo from "./logo.svg";
import "./App.css";
import AllRoutes from "./components/AllRoutes";
import AuthWatcher from "./components/AuthWatcher";

function App() {

  return (
    <>
      <AuthWatcher/>
      <AllRoutes />
    </>
  );
}

export default App;
