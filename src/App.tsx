import { useRoutes } from "react-router-dom";
import AppRoutes from "./routes";

function App() {
  const routing = useRoutes(AppRoutes);
  return <>{routing}</>;
}

export default App;
