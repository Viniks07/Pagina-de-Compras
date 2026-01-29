import { StyledEngineProvider } from "@mui/material/styles";
import AppRoutes from "./routes/AppRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from "./components/Toast.module.css"

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <AppRoutes />
      <ToastContainer 
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover={true}
        theme="colored"
        className={styles.customToast}
      />
    </StyledEngineProvider>
  );
}

export default App;
