// components/CityChart.jsx
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import InformationIconBis from "./InformationIconBis";


const CityChart = () => {
  const [data, setData] = useState([]);
  const [layout, setLayout] = useState({});
  const [loading, setLoading] = useState(true); // 👈 Ajout du state loading

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 👈 Commence le chargement

      const res = await fetch("http://localhost:5000/annonces-par-ville");
      const json = await res.json();

      const sorted = Object.entries(json).sort((a, b) => a[1] - b[1]);
      const labels = sorted.map(([k]) => k);
      const values = sorted.map(([, v]) => v);

      setData([
        {
          type: "bar",
          x: values,
          y: labels,
          orientation: "h",
          marker: { color: "rgba(54, 162, 235, 0.7)" },
        },
      ]);

      setLayout({
        title: "Nombre d'annonces par ville",
        margin: { l: 100, r: 30, t: 50, b: 50 },
        xaxis: { title: "Nombre d'annonces" },
        yaxis: {
          tickfont: { size: 7 },
        },
      });

      setLoading(false); // 👈 Fin du chargement
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div>
          <h3 style={{display: 'flex', justifyContent: 'center'}}>
            Nombre annonces par ville
            &nbsp;
            <InformationIconBis
              text={
                <div>
                  <p>
                    {'Utilité du graphique :'}
                    <br></br>
                    {
                      "Ce graphique permet d’identifier les villes où l’offre immobilière est la plus concentrée, celles qui sont les plus actives en termes de diffusion d’annonces. Il aide ainsi à repérer les zones dynamiques du marché."
                    }
                  </p>
                  <p>
                    {'Observation :'}
                    <br></br>
                    {
                      "On observe que les villes comptant le plus grand nombre d’annonces sont Colombes, Rueil-Malmaison, Antony, Clamart et Nanterre. Cela indique que, dans le département des Hauts-de-Seine (92), ces communes représentent actuellement les zones les plus dynamiques en termes d’offre immobilière. Pour un agent immobilier, cela peut représenter un intérêt stratégique de concentrer davantage ses efforts sur ces secteurs porteurs."
                    }
                  </p>
                </div>
              }
            />
          </h3>
          
          <Plot data={data} layout={layout} style={{ width: "100%" }} />
        </div>
      )}
    </div>
  );
};

export default CityChart;
