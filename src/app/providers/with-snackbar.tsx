import { SnackbarProvider } from "notistack";

export const withSnackbar = (component: () => React.ReactNode) => () =>
	<SnackbarProvider maxSnack={3}>{component()}</SnackbarProvider>;
