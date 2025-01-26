import { Box } from "@mui/material";

export const TabPanel = (props: any) => {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`tabpanel-${index}`}
			aria-labelledby={`tab-${index}`}
			className="h-full"
			{...other}
		>
			{value === index && <Box className="h-full">{children}</Box>}
		</div>
	);
};
