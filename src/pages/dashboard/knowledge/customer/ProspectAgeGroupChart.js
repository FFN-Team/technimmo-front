import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const barChartOptions = {
  chart: {
    type: 'bar',
    height: 365,
    toolbar: {
      show: false
    }
  },
  plotOptions: {
    bar: {
      columnWidth: '45%',
      borderRadius: 4
    }
  },
  dataLabels: {
    enabled: true
  },
  xaxis: {
    categories: [],
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: false
  },
  grid: {
    show: false
  },
  tooltip: {
    enabled: false
  }
};

// ==============================|| PROSPECT AGE GROUP CHART ||============================== //

const ProspectAgeGroupChart = () => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  const [series, setSeries] = useState([{ data: [] }]);
  const [options, setOptions] = useState({
    ...barChartOptions,
    xaxis: { categories: [] }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:9001/api/v1/statistics/prospects/count-by-age-group');
        const data = await response.json();

        setSeries([{ data: data.data.map((item) => item.value) }]);

        setOptions((prevState) => ({
          ...prevState,
          xaxis: {
            ...prevState.xaxis,
            categories: data.data.map((item) => item.label)
          }
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
      <ReactApexChart options={options} series={series} type="bar" height={365} />
    </div>
  );
};

export default ProspectAgeGroupChart;
