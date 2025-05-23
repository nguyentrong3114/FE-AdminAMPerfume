
import AppRoutes from "./router";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes isDark={false} toggleTheme={() => {}} />
      </BrowserRouter>
    </>
  );
}

export default App;
