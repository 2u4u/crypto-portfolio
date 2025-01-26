import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const withLocalizationProvider =
	(component: () => React.ReactNode) => () =>
		(
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				{component()}
			</LocalizationProvider>
		);
