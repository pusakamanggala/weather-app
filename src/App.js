import "./App.css";
import WeatherCard from "./components/WeatherCard";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App bg-mainColor h-screen flex justify-center text-white items-center">
        <WeatherCard />
      </div>
    </QueryClientProvider>
  );
}

export default App;
