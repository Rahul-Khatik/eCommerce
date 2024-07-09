// import { Alert } from "react-bootstrap";

// const Message = ({ variant, children }) => {
//   return <Alert variant={variant}>{children}</Alert>;
// };

// Message.defaultProps = {
//   variant: "info",
// };

// export default Message;

import { Alert } from "@mui/material";

const Message = ({ variant, children }) => {
  return <Alert severity={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
