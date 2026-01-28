import { StyledEngineProvider } from "@mui/material/styles";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <AppRoutes />
    </StyledEngineProvider>
  );
}

export default App;
