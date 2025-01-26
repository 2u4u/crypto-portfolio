import { CircularProgress } from "@mui/material";

export const Loading = ({
  size = 16,
  color = "var(--cp-grey-400)",
}: {
  size?: number;
  color?: string;
}) => (
  <CircularProgress
    size={size}
    className="ml-2"
    sx={{
      color,
    }}
  />
);
