// components/ClusterPlot.jsx
import { useEffect, useRef, useState } from "react";
import Plotly from "plotly.js-dist";
import InformationIconBis from "./InformationIconBis";


const ClusterPlot = () => {
  const chartRef = useRef();
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchAndRender = async () => {
      setLoading(true);
      
      const response = await fetch("http://localhost:5000/clusters");
      setLoading(false);

      const data = await response.json();

      const clusterColors = [
        "#e6194b", "#3cb44b", "#ffe119", "#4363d8",
        "#f58231", "#911eb4", "#46f0f0", "#f032e6"
      ];

      const individualsByCluster = {};
      data.individuals.forEach(({ cluster, x, y }) => {
        if (!individualsByCluster[cluster]) {
          individualsByCluster[cluster] = { x: [], y: [] };
        }
        individualsByCluster[cluster].x.push(x);
        individualsByCluster[cluster].y.push(y);
      });

      const pointTraces = Object.entries(individualsByCluster).map(([cluster, coords], i) => ({
        x: coords.x,
        y: coords.y,
        mode: "markers",
        type: "scatter",
        name: `Cluster ${cluster}   `,
        marker: { color: clusterColors[i % clusterColors.length], size: 6 }
      }));

      const arrowTraces = data.variables
        .filter(v => Math.sqrt(v.x ** 2 + v.y ** 2) >= 0.5)
        .map(v => ({
          type: "scatter",
          x: [0, v.x],
          y: [0, v.y],
          mode: "lines+markers",
          marker: { size: 0.001 },
          line: { color: "blue", width: 1 },
          text: v.var,
          hoverinfo: "text",
          showlegend: false
        }));

      const arrowAnnotations = data.variables
        .filter(v => Math.sqrt(v.x ** 2 + v.y ** 2) >= 0.5)
        .map(v => ({
          ax: 0, ay: 0,
          x: v.x, y: v.y,
          xref: "x", yref: "y",
          axref: "x", ayref: "y",
          showarrow: true,
          arrowhead: 3,
          arrowsize: 1.5,
          arrowwidth: 1,
          arrowcolor: "blue",
          xanchor: "center",
          yanchor: "bottom"
        }));

      const layout = {
        title: "ACP + Clustering",
        xaxis: { title: "Dim1", zeroline: true },
        yaxis: { title: "Dim2", zeroline: true },
        showlegend: true,
        annotations: arrowAnnotations
      };

      Plotly.newPlot(chartRef.current, [...pointTraces, ...arrowTraces], layout);

    };

    fetchAndRender();
  }, []);

  return <div> 
    {loading ? (<p>Chargement...</p>) : (
      <div>
        <h3 style={{display: 'flex', justifyContent: 'center'}}>
          Regroupement des biens similaires
          &nbsp;
          <InformationIconBis
            text={
              <div>
                <p>
                  {'Remarque et objectif :'}
                  <br></br>
                  {
                    "Ce biplot représente les individus/biens après une ACP sur les variables et une classification k-means. Les dimensions 1 et 2s ont été conservées. Dim1 est lié aux variables : square, room, bedroom, et reflète les caractéristiques physiques des biens. Dim2, basé sur energy_rate et ges, reflète la performance énergétique des biens."
                  }
                   <br></br>
                  {
                    "Ce biplot permet de segmenter les biens immobiliers selon leurs caractéristiques principales, en identifiant des groupes similaires."
                  }
                </p>            
                <p>
                  {'Observation :'}
                  <br></br>
                  {
                    "Le cluster 0 regroupe des grands biens avec de nombreuses pièces, mais une performance énergétique variable. Le cluster 1 contient des biens plus petits avec moins de pièces et une performance énergétique variée. Le cluster 3 inclut des biens avec une haute performance énergétique, bien que leur taille varie. Enfin, le cluster 2 correspond à des biens de taille variable et de faible performance énergétique."
                  }
                </p>
              </div>
            }
          /> 
        </h3>

        <div className="chart-container" ref={chartRef}></div>
      </div>
    )}
    </div>;
};

export default ClusterPlot;
