// import { Spinner } from "react-bootstrap";

// const Loader = () => {
//   return (
//     <Spinner
//       animation="border"
//       role="status"
//       style={{
//         width: "100px",
//         height: "100px",
//         margin: "auto",
//         display: "block",
//       }}
//     ></Spinner>
//   );
// };

// export default Loader;

import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <CircularProgress
      size={100}
      sx={{
        margin: "auto",
        display: "block",
      }}
    />
  );
};

export default Loader;
