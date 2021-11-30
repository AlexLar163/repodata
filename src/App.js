import React from "react";
import Search from "./Search";
import Login from "./Login";

const App = () => {
  return (
    <div className="App">
      <Login >
        <Search />
      </Login>
    </div>
  );
};

export default App;
