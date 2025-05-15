import "./App.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <ThemeProvider>
        <Button>Clock</Button>
        <p>This is Aabhushan</p>
        <p>THis is Sushil </p>
      </ThemeProvider>
    </>
  );
}

export default App;
