// components/ClusterPercentageChart.jsx
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import InformationIconBis from "./InformationIconBis";

const ClusterPercentageChart = () => {
  const [data, setData] = useState([]);
  const [layout, setLayout] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchClusters = async () => {
      setLoading(true);

      const res = await fetch("http://localhost:5000/clusters");
      const json = await res.json();

      const clusterCounts = json.individuals.reduce((acc, indiv) => {
        acc[indiv.cluster] = (acc[indiv.cluster] || 0) + 1;
        return acc;
      }, {});

      const total = json.individuals.length;

      const labels = Object.keys(clusterCounts).map(c => `Cluster ${c}   `);
      const values = Object.values(clusterCounts).map(count => ((count / total) * 100).toFixed(2));

      const colors = [
        "#e6194b", "#3cb44b", "#ffe119", "#4363d8",
        "#f58231", "#911eb4", "#46f0f0", "#f032e6"
      ];

      setData([
        {
          type: "pie",
          labels,
          values,
          textinfo: "label+percent",
          textposition: "outside",
          marker: {
            colors: labels.map((_, i) => colors[i % colors.length])
          },
          automargin: true,
        }
      ]);

      setLayout({
        title: "Pourcentage de chaque cluster",
        showlegend: true,
        margin: { t: 50, b: 50, l: 50, r: 50 },
      });

      setLoading(false);
    };

    fetchClusters();
  }, []);

  return <div> 
    {loading ? (<p>Chargement...</p>) : (
      <div>
        <h3 style={{display: 'flex', justifyContent: 'center'}}>
          Répartition des clusters
          &nbsp;
          <InformationIconBis
            text={
              <div>               
                <p>
                  {'Interprétation :'}
                  <br></br>
                  {
                    "La majorité des biens (45%) sont de petite taille avec une performance énergétique variable, ce qui correspond à une forte demande pour des biens abordables. 21% des biens ont une faible consommation énergétique et une taille variable, un marché de niche pour les clients soucieux de l'environnement. 20% des biens sont grands mais avec une performance énergétique variable, ce qui peut attirer les familles, mais nécessite de travailler sur leur efficacité énergétique. Enfin, 13% des biens sont très consommateurs énergétiquement, ce qui peut rendre leur vente plus difficile."
                  }
                </p>
              </div>
            }
          />    
        </h3>

        <Plot data={data} layout={layout} style={{ width: "100%" }} />
      </div>
    )}
    </div>;
};

export default ClusterPercentageChart;
