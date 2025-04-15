import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const pieChartOptions = {
  chart: {
    type: 'pie',
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

// ==============================|| PROSPECT PROFESSION CHART ||============================== //

const ProspectProfessionChart = () => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [series, setSeries] = useState([{ data: [] }]);
  const [options, setOptions] = useState({
    ...pieChartOptions,
    labels: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9001/api/v1/statistics/prospects/count-by-profession');
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
      <ReactApexChart options={options} series={series} type="pie" height={365} />
    </div>
  );
};

export default ProspectProfessionChart;
