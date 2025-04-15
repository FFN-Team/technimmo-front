// components/SellTypeChart.jsx
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import InformationIconBis from "./InformationIconBis";


const SellTypeChart = () => {
  const [chartData, setChartData] = useState([]);
  const [layout, setLayout] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch("http://localhost:5000/annonces-par-sell-type");
      setLoading(false);

      const data = await res.json();
      const labels = Object.keys(data);
      const values = Object.values(data);

      setChartData([
        {
          type: "pie",
          labels,
          values,
          textinfo: "label+percent",
          textposition: "outside",
          automargin: true,
          marker: {
            colors: ["rgba(86, 168, 255, 0.7)", "rgba(255, 241, 118, 0.7)"],
          },
        },
      ]);

      setLayout({
        title: "Répartition des annonces par type de vente",
        showlegend: true,
        margin: { t: 50, b: 50, l: 50, r: 50 },
      });
    };

    fetchData();
  }, []);

  return (
    <div>
    {loading ? (<p>Chargement...</p>) : (
      <div>
        <h3 style={{display: 'flex', justifyContent: 'center'}}>
          Répartition des annonces par type de vente
          &nbsp;
          <InformationIconBis
            text={
              <div>
                <p>
                  {'Utilité du graphique :'}
                  <br></br>
                  {
                    "Ce graphique permet à un agent immobilier de visualiser rapidement quels types de biens (ancien ou neuf) sont les plus présents sur le marché en ligne, afin d'ajuster sa stratégie commerciale en fonction de l'offre dominante."
                  }
                </p>
                <p>
                  {'Observation :'}
                  <br></br>
                  {
                    "L'analyse montre que le marché est largement dominé par les biens anciens, représentant 92 % des annonces, contre seulement 8 % pour les biens neufs. Cela peut traduire une offre très limitée en immobilier neuf, soit en raison d’un faible volume de construction, soit d’une commercialisation plus ciblée. Cette répartition met en évidence une prédominance du marché de l’ancien, tout en soulignant que les biens neufs, plus rares, peuvent constituer un segment différenciant à exploiter."
                  }
                </p>
              </div>
            }
          />        
        </h3>

        <Plot
          data={chartData}
          layout={layout}
          style={{ width: "100%" }}
        />
      </div>)}
    </div>
  );
};

export default SellTypeChart;
