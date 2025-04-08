import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const AdsPublicationDateChart = () => {
  const [labels, setLabels] = useState([]);
  const [values, setValues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://localhost:5000/annonces-par-sell-type");
      const data = await res.json();

      setLabels(Object.keys(data));
      setValues(Object.values(data));
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '10px',
        maxWidth: '900px',
        margin: '0 auto',
        paddingTop: '20px'
      }}
    >
      <Plot
        data={[
          {
            type: "pie",
            labels,
            values,
            textinfo: "label+percent",
            textposition: "outside",
            automargin: true,
            marker: {
              colors: ["rgba(255, 99, 132, 0.7)", "rgba(255, 206, 86, 0.7)"],
            },
          }
        ]}
        layout={{
          title: "Répartition des annonces par type de vente",
          showlegend: true,
          margin: { t: 50, b: 50, l: 50, r: 50 },
        }}
        useResizeHandler={true}
      />

    </div>
  );
};

export default AdsPublicationDateChart;