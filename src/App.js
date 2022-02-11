import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";

import Chats from "./components/Chats";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div style={{ fontFamily: "Avenir" }}>
      <Router>
        <AuthProvider>
          <Switch>
            <Route path="/chats" component={Chats} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/" component={Homepage} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
