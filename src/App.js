import './App.css';
import { BrowserRouter } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar";
import Router from "./Router/Router";
import { useState } from "react";
import { LanguageContext } from "./Context/Language"

function App() {
  const [contextLanguage, setContextLanguage] = useState("en")

  return (
    <div className="App">
      <BrowserRouter>
        <LanguageContext.Provider value={{contextLanguage, setContextLanguage}}>
            <NavBar />
            <div className="container">
              <Router />
            </div>
          </LanguageContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;