import React from "react";
import SvgIcon from "@mui/material/SvgIcon";

function StrideIcon(props) {
  return (
    <SvgIcon {...props} viewBox="0 0 24 24" >
      <circle cx="12" cy="12" r="12" fill="#90caf9" />
      <path d="M7 13l2 2 6-6-2-2-4 4l-2-2Z M15 7l3 3-3 3Z" fill="#FFFFFF" />
    </SvgIcon>
  );
}
export default StrideIcon;