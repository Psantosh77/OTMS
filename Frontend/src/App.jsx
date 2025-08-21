import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import ErrorBoundary from "./components/ErrorBoundary";
import RoutesConfig from "./RoutesConfig";


import store from "./redux/store";
// ...existing code...

import "./index.css";

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
        
          <RoutesConfig />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
            
}


export default App;