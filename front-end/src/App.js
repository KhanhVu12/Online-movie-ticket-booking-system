import  { Navbar }  from "./components/navbar";
import { SideBar } from "./components/sidebar";
import { GlobalStyle } from "./GlobalStyle";

function App() {
  return (
    <div className="Admin Page">
      <Navbar />
      <div className="sidebarContainer">
        <SideBar />
      </div>
      <GlobalStyle />
    </div>
  );
}

export default App;
