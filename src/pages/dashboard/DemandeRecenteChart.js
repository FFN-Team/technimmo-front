// components/DemandeRecenteChart.jsx
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import InformationIconBis from "./InformationIconBis";


const DemandeRecenteChart = () => {
  const [data, setData] = useState([]);
  const [layout, setLayout] = useState({});
  const [days, setDays] = useState("30");
  const [loading, setLoading] = useState(true); // 👈 Nouveau state pour le chargement

  const fetchAndRender = async (selectedDays) => {
    setLoading(true); // 👈 Commence le chargement
    const res = await fetch(`http://localhost:5000/demande-recente-like?days=${selectedDays}`);
    const json = await res.json();

    const sortedDemande = Object.entries(json.demande_par_ville);
    const sortedFavorites = Object.entries(json.favorites_moyenne_par_ville);

    const labels = sortedDemande.map(([ville]) => ville);
    const annonceValues = sortedDemande.map(([, value]) => value);
    const favoriteValues = sortedFavorites.map(([, value]) => value);

    setData([
      {
        type: "bar",
        x: labels,
        y: annonceValues,
        name: "Nombre d'annonces   ",
        marker: { color: "rgba(75, 192, 192, 0.7)" }
      },
      {
        type: "bar",
        x: labels,
        y: favoriteValues,
        name: "Nombre de favoris moyen par annonce         ",
        marker: { color: "rgba(153, 102, 255, 0.7)" }
      }
    ]);

    setLayout({
      title: `Demandes récentes et favoris (${selectedDays} derniers jours)`,
      barmode: "group",
      margin: { l: 100, r: 30, t: 50, b: 70 },
      xaxis: { title: "Ville", tickfont: { size: 8 } },
      yaxis: { title: "Volume", tickfont: { size: 8 } }
    });

    setLoading(false); // 👈 Fin du chargement
  };

  useEffect(() => {
    fetchAndRender(days);
  }, [days]);

  const handleSelectChange = (e) => {
    setDays(e.target.value);
  };

  return (
    <div>
      <h3 style={{display: 'flex', justifyContent: 'center'}}>
          Offres récentes et réactivité moyen client par ville
          &nbsp;
          <InformationIconBis
            text={
              <div>
                <p>
                  {'Utilité du graphique :'}
                  <br></br>
                  {
                    "Ce graphique permet d’identifier les villes les plus dynamiques sur une période donnée et d’évaluer si ces zones ont suscité de l’intérêt de la part des clients sur cette période."
                  }
                </p>
                <p>
                  {'Observation :'}
                  <br></br>
                  {
                    "Au cours des 15 derniers jours, de nombreuses annonces ont été publiées à Rueil-Malmaison, mais la réactivité des clients n’a pas été au rendez-vous, avec peu d’interactions. En revanche, à Clamart, bien que de nombreuses annonces aient également été publiées, la réactivité des clients a été plus forte, faisant de cette ville celle qui a généré le plus d’intérêt en moyenne durant cette période. Quant à Antony, les annonces n’ont pas rencontré de succès."
                  }
                  <br></br>
                  {
                    "Sur les 12 derniers mois, les annonces des villes d’Avral, Gennevilliers, Sèvres et Vannes ont plutôt bien fonctionné."
                  }
                  <br></br>
                  {
                    "Ce sont ces villes à succès que l’agent immobilier doit surveiller de près pour orienter ses actions de prospection."
                  }
                </p>
              </div>
            }
          />
      </h3>
      <label htmlFor="daysSelect">Période : </label>
      <select id="daysSelect" value={days} onChange={handleSelectChange}>
        <option value="15">15 jours</option>
        <option value="30">1 mois</option>
        <option value="60">2 mois</option>
        <option value="90">3 mois</option>
        <option value="360">1 an</option>
      </select>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <Plot data={data} layout={layout} style={{ width: "100%" }} />
      )}
    </div>
  );
};

export default DemandeRecenteChart;
