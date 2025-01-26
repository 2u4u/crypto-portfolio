import { Typography } from "@mui/material";
import { ReactNode } from "react";

export const InputLabel = ({ children }: { children: ReactNode | string }) => (
	<Typography sx={{ fontSize: 14, color: "var(--cp-grey-600)", mb: 1 }}>
		{children}
	</Typography>
);
