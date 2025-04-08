// components/BuildingYearBoxplot.jsx
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import InformationIconBis from "./InformationIconBis";

const BuildingYearBoxplot = () => {
  const [data, setData] = useState([]);
  const [layout, setLayout] = useState({});
  const [loading, setLoading] = useState(true); 


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch("http://localhost:5000/annee-construction-par-ville");
      const json = await res.json();

      const boxData = Object.entries(json).map(([ville, annees]) => ({
        type: "box",
        name: ville,
        y: annees,
        boxpoints: false,
        marker: {
          color: "rgba(255, 159, 64, 0.7)",
        },
      }));

      setData(boxData);
      setLayout({
        title: "Année de construction par ville",
        yaxis: {
          title: "Année de construction",
          range: [1800, 2030],
          gridcolor: "rgba(200, 200, 200, 0.2)",
        },
        xaxis: {
          tickangle: -30,
          automargin: true,
        },
        margin: { t: 50, b: 100, l: 60, r: 30 },
      });

      setLoading(false);
    };

    fetchData();
  }, []);

  return <div> 
    {loading ? (<p>Chargement...</p>) : (
      <div>
        <h3 style={{display: 'flex', justifyContent: 'center'}}>
          Année de construction des biens à vendre par ville
          &nbsp;
          <InformationIconBis
            text={
              <div>
                <p>
                  {'Utilité du graphique :'}
                  <br></br>
                  {
                    "Ce graphique permet d'observer, ville par ville, si les biens à vendre sont plutôt anciens ou récents."
                  }
                </p>
                <p>
                  {'Observation :'}
                  <br></br>
                  {
                    "Dans la majorité des villes, la plupart des maisons en vente ont été construites entre 1900 et 2000. Certaines communes, comme Bagneux, Colombes ou Nanterre, présentent également des biens plus anciens, datant parfois de 1800 à 1850. On observe aussi, dans la plupart des villes, la présence de biens construits après 2000, mais en très faible proportion."
                  }
                  <br></br>
                  {
                    "Cela indique que le marché immobilier est principalement composé de logements anciens, ce qui peut refléter un parc immobilier relativement âgé, avec potentiellement des besoins en rénovation ou en mise aux normes. La faible présence de biens récents suggère un rythme de construction neuve limité dans ces zones, ce qui peut impacter l’offre disponible pour les acheteurs recherchant des logements modernes."
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

export default BuildingYearBoxplot;
