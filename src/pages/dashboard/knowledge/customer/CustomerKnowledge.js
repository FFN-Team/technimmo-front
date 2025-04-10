import React from 'react';

// material-ui
import { Grid, Typography } from '@mui/material';

import ProspectAgeGroupChart from '../../ads/analytics/ProspectAgeGroupChart';
import ProspectProfessionChart from '../../ads/analytics/ProspectProfessionChart';
import ProspectContactOriginChart from '../../ads/analytics/ProspectContactOriginChart';
import MainCard from 'components/MainCard';

const CustomerKnowledge = () => {
  return (
    <div>
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid item xs={12}>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 'bold',
            color: 'black',
            mb: 1,
            borderColor: 'primary.light',
            display: 'center',
          }}
        >
        Connaissance Clients
        </Typography>
      </Grid>

      <Grid item md={8} sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} />

      {/* row 2 */}
      <Grid item xs={12} md={9} lg={8}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Nombre de prospects par groupe d&apos;âge</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <ProspectAgeGroupChart />
        </MainCard>
      </Grid>
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Typography variant="h5">Nombre de prospects par profession</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
          <ProspectProfessionChart />
        </MainCard>
      </Grid>

      {/* row 3 */}
      <Grid item xs={12} md={5} lg={4}>
        <Grid container alignItems="center" justifyContent="space-between">
        <Grid item>
            <Typography variant="h5">Nombre de prospects par contact d&apos;origine</Typography>
          </Grid>
          <Grid item />
        </Grid>
        <MainCard sx={{ mt: 2 }} content={false}>
        <ProspectContactOriginChart />
        </MainCard>
      </Grid>
    </Grid>
    </div>
  );
};

export default CustomerKnowledge;
