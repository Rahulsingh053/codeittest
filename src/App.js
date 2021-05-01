import { useState } from "react";
import "./App.css";
import Signup from "./signup";
import Signin from "./signin";
import Button from "@material-ui/core/Button";

function App() {
  const [appState, setappState] = useState(null);
  return (
    <div>
      {!appState && (
        <div class="mainpage">
          <h1>
            Welcome to my web page
          </h1>
          <Button
            onClick={() => setappState("Signup")}
            variant="contained"
            color="primary"
          >
            Sign Up
          </Button>
          <Button
            onClick={() => setappState("Signin")}
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        </div>
      )}
      {appState === "Signup" && <Signup setappState={setappState}></Signup>}
      {appState === "Signin" && <Signin setappState={setappState}></Signin>}
    </div>
  );
}

export default App;
