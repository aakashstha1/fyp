import "./App.css";
import { ThemeProvider } from "./components/ThemeProvider";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <ThemeProvider>
        <Button>Clock</Button>
      </ThemeProvider>
    </>
  );
}

export default App;
