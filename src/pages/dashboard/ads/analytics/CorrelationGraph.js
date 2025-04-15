// components/CorrelationGraph.jsx
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import InformationIconBis from "./InformationIconBis";


const CorrelationGraph = () => {
  const [data, setData] = useState([]);
  const [layout, setLayout] = useState({});
  const [loading, setLoading] = useState(true); // 👈 Ajout du state loading

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 👈 Commence le chargement

      const res = await fetch("http://localhost:5000/api-correlation-prix");
      const json = await res.json();

      const variables = Object.keys(json);
      const correlations = Object.values(json);

      setData([
        {
          x: variables,
          y: correlations,
          type: "bar",
          marker: { color: "rgb(255, 183, 77, 0.7)" }
        }
      ]);

      setLayout({
        title: "Corrélations entre le prix annoncé et les autres variables",
        xaxis: { title: "Variables" },
        yaxis: { title: "Corrélation" }
      });

      setLoading(false); 
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
            Corrélations entre le prix annoncé et les autres variables
            &nbsp;
            <InformationIconBis
              text={
                <div>
                  <p>
                    {'Utilité du graphique :'}
                    <br></br>
                    {
                      "Ce graphique permet de comprendre comment les différentes caractéristiques d'un bien influencent le prix d'annonce."
                    }
                  </p>
                  <p>
                    {'Observation :'}
                    <br></br>
                    {
                      "Les variables les plus corrélées avec le prix d'annonce sont 'bedroom', 'room' et 'square', avec une corrélation positive. Cela signifie que le prix augmente à mesure que la taille de la maison croît. Cependant, cela paraît étrange, car d'autres variables semblent moins corrélées avec le prix d'annonce. Cela peut être normal, ou bien cela pourrait indiquer que les prix fixés dans les annonces ne sont pas représentatifs. En effet, le prix devrait normalement être influencé par d'autres facteurs tels que le quartier, le score de consommation, le score des services, etc."
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

export default CorrelationGraph;
