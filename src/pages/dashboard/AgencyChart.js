// components/AgencyChart.jsx
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import InformationIconBis from "./InformationIconBis";


const AgencyChart = () => {
  const [data, setData] = useState([]);
  const [layout, setLayout] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch("http://localhost:5000/annonces-par-agence");
      const json = await res.json();

      const sorted = Object.entries(json).sort((a, b) => b[1] - a[1]);
      const labels = sorted.map(([k]) => k);
      const values = sorted.map(([, v]) => v);

      setData([
        {
          type: "bar",
          x: labels,
          y: values,
          marker: { color: "rgba(153, 102, 255, 0.7)" },
        },
      ]);

      setLayout({
        title: "Nombre d'annonces par agence",
        xaxis: {
          title: "Agences",
          tickangle: -45,
          tickfont: { size: 8 },
        },
        yaxis: { title: "Nombre d'annonces" },
        margin: { t: 50, b: 150, l: 100, r: 30 },
      });

      setLoading(false);
    };

    fetchData();
  }, []);

  return <div>
    {loading ? (<p>Chargement...</p>) : (
      <div>
        <h3 style={{display: 'flex', justifyContent: 'center'}}>
          Nombre annonces par agence
          &nbsp;
          <InformationIconBis
            text={
              <div>
                <p>
                  {'Utilité du graphique :'}
                  <br></br>
                  {
                    "Ce graphique permet d'analyser l'activité des agences en comparant le nombre d'annonces, offrant ainsi des insights sur la concurrence et permettant d'ajuster les stratégies commerciales."
                  }
                </p>
                <p>
                  {'Observation :'}
                  <br></br>
                  {
                    "Les agences les plus présentes sont : SARL Davidson, Peclers Immobilier, Maisons Pierre et JDC Conseil. L'agent immobilier doit donc analyser ces concurrents afin de se différencier en offrant des services de meilleure qualité."
                  }
                </p>
              </div>
            }
          />
        </h3>

        <Plot data={data} layout={layout} style={{ width: "100%" }}/>
      </div>
    )}
    </div>;
};

export default AgencyChart;
