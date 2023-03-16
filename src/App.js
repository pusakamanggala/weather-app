import "./App.css";
import WeatherCard from "./components/WeatherCard";
import { QueryClient, QueryClientProvider } from "react-query";
import About from "./components/About";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App bg-mainColor h-screen flex justify-center text-white items-center">
        <About />
        <WeatherCard />
      </div>
    </QueryClientProvider>
  );
}

export default App;
