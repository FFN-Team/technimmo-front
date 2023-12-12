import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const donutChartOptions = {
  chart: {
    type: 'donut',
    height: 365
  },
  labels: [],
  legend: {
    show: true,
    position: 'bottom'
  },
  tooltip: {
    enabled: true,
    theme: 'light'
  }
};

// ==============================|| PROSPECT CONTACT ORIGIN CHART ||============================== //

const ProspectContactOriginChart = () => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [series, setSeries] = useState([{ data: [] }]);
  const [options, setOptions] = useState({
    ...donutChartOptions,
    labels: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9001/api/v1/statistics/prospects/count-by-contact-origin');
        const data = await response.json();

        setSeries(data.data.map((item) => item.value));
        setOptions((prevState) => ({
          ...prevState,
          labels: data.data.map((item) => item.label)
        }));
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'API", error);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primary, info, secondary]);

  return (
    <div id="chart">
      <ReactApexChart options={options} series={series} type="donut" height={365} />
    </div>
  );
};

export default ProspectContactOriginChart;
