// components/ProParticulierChart.jsx
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import InformationIconBis from "./InformationIconBis";

const ProParticulierChart = () => {
  const [data, setData] = useState([]);
  const [layout, setLayout] = useState({});
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch("http://localhost:5000/annonces-pro-vs-particulier");
      setLoading(false);
      const json = await res.json();

      setData([
        {
          type: "pie",
          labels: Object.keys(json),
          values: Object.values(json),
          textinfo: "label+percent",
          textposition: "outside",
          automargin: true,
          marker: {
            colors: ["rgba(199, 230, 20, 0.7)", "rgba(255, 183, 77, 0.7)"],
          },
        },
      ]);

      setLayout({
        title: "Répartition Pro vs Particulier",
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
            Répartition des Annonces Immobilières : Professionnels vs Particuliers
            &nbsp;
            <InformationIconBis 
              text={
                <div>
                  <p>
                    {'Utilité du graphique :'}
                    <br></br>
                    {
                      "Ce graphique permet d'analyser la répartition des annonces publiées par des professionnels ou des particuliers. Pour un agent immobilier, il offre une vision claire de la concurrence et des tendances du marché, ce qui permet d'ajuster les stratégies commerciales."
                    }
                  </p>
                  <p>
                    {'Observation :'}
                    <br></br>
                    {
                      "L'observation du graphique, montrant que 90% des annonces sont publiées par des professionnels et seulement 10% par des particuliers, révèle une forte dominance des acteurs professionnels sur le marché. Cela indique que les professionnels contrôlent largement l'offre, ce qui peut signifier une concurrence accrue entre agents immobiliers. En tant qu'agent immobilier, cela suggère qu'il est essentiel de se différencier par des services de qualité et un accompagnement personnalisé pour capter une part de marché même face à cette forte concentration professionnelle."
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

export default ProParticulierChart;
