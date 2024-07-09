import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "@mui/material";

function App() {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>

          <Box sx={{ padding: "10px" }}>
            <Outlet />
          </Box>
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </>
  );
}

export default App;
