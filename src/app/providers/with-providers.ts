import compose from "compose-function";
import { withMuitheme } from "./with-mui-theme";
import { withLocalizationProvider } from "./with-localization-provider";
import { withSnackbar } from "./with-snackbar";

export const withProviders = compose(
	withMuitheme,
	withLocalizationProvider,
	withSnackbar
);
