import "./App.css";
import { ThemeProvider } from "./components/ThemeProvider";
import AppRoutes from "./routes/routes";

function App() {
  return (
    <>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
