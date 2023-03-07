import "./App.css";
import WeatherInfo from "./components/WeatherInfo";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App bg-mainColor h-screen flex justify-center text-white items-center">
        <WeatherInfo />
      </div>
    </QueryClientProvider>
  );
}

export default App;
