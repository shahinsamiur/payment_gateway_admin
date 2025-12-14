import { Chip } from "@mui/material";

function RenderStatus(status) {
  const colors = {
    Online: "success",
    Offline: "default",
  };

  return (
    <Chip
      label={status}
      variant="outlined"
      color={colors[status]}
      size="small"
    />
  );
}

export default RenderStatus;
