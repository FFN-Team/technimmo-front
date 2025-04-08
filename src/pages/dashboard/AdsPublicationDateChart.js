import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import InformationIcon from './InformationIcon';

const AdsPublicationDateChart = () => {
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/date-publication-annonces');
        const adsPublicationDateData = await response.json();
        const stringDates = Object.values(adsPublicationDateData)[0];
        setDates(stringDates.map((date) => new Date(date)));
      } catch (error) {
        console.error("Erreur lors de la récupération des données de l'API", error);
      }
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
            x: dates,
            type: 'box',
            name: 'Dates',
            hoverlabel: {
              font: {
                size: 12,
                color: '#1d76b3'
              },
              bgcolor: 'white',
              bordercolor: 'white'
            }
          }
        ]}
        layout={{ title: { text: 'Dates de publication des annonces' } }}
        useResizeHandler={true}
      />

      <InformationIcon
        text={
          <div>
            <p>
              {'Utilité du graphique :'}
              <br></br>
              {
                "Ce graphique place dans le temps les dates de publication des annonces immobilières. Il permet à l'agent immobilier savoir si une annonce est présente en ligne depuis longtemps ou non. Si c'est le cas, nous pouvons estimer que l'offre n'est pas assez convaincante pour de futurs acheteurs/ses et nécessite donc d'être améliorée."
              }
            </p>
            <p>
              {'Observation :'}
              <br></br>
              {
                "La plus ancienne annonce a été publiée le 11 novembre 2022 alors que la plus récente l'a été le 28 mars 2025. La date médiane est le 26 février 2025 et on remarque que la plupart des annonces sont récentes par rapport à la date d'extraction puisque 50 % de celles-ci sont apparues entre le 13 janvier et le 14 mars 2025. De plus, des valeurs extrêmes sont présentes. En effet, seulement 4 annonces furent publiées avant 2024. Malgré leur durée d'accessibilité en ligne plus élevée, celles-ci n'ont pas trouvé preneur/se."
              }
            </p>
          </div>
        }
      />
    </div>
  );
};

export default AdsPublicationDateChart;
