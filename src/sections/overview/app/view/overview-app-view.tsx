import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
// components
import { useSettingsContext } from 'src/components/settings';
import AppNewInvoice from '../app-new-invoice';
import data from './data.json';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <AppNewInvoice
            title="Flight List"
            tableData={data}
            tableLabels={[
              { id: 'fpfx', label: 'FPFX' },
              { id: 'flnr', label: 'FLNR' },
              { id: 'dep', label: 'DEP' },
              { id: 'arr', label: 'DST' },
              { id: 'flightDate', label: 'Flight Date' },
              { id: 'std', label: 'STD' },
              { id: 'sta', label: 'STA' },
              { id: 'acReg', label: 'ACREG' },
              { id: 'passengerCount', label: 'PAX' },
              { id: 'weight', label: 'Extra Weight' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
