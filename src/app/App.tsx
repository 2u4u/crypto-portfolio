import { Box, Button, Container, Tab, Tabs, Typography } from "@mui/material";
import { withProviders } from "./providers/with-providers";
import { SyntheticEvent, useState } from "react";
import { useModalStore } from "../shared/store";
import { TransactionDrawer, Assets, Transactions } from "../components";
import { TabPanel } from "../shared/ui";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `tab-${index}`,
  };
}

const App = () => {
  const [value, setValue] = useState(0);
  const { setTransactionFormOpen } = useModalStore();

  const handleChange = (_: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container className="h-full flex flex-col">
      <Box
        component="header"
        className="flex justify-between py-4 items-center"
      >
        <Typography component="h1">My crypto portfolio</Typography>
        <Button variant="contained" onClick={setTransactionFormOpen}>
          Add transaction
        </Button>
      </Box>
      <Box className="h-full flex flex-col">
        <Box className="border-b border-divider-color">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Transactions" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Assets />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Transactions />
        </TabPanel>
      </Box>
      <TransactionDrawer />
    </Container>
  );
};

const AppWithProviders = withProviders(App);

export default AppWithProviders;
