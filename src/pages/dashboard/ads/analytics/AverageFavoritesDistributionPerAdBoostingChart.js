import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import InformationIcon from './InformationIcon';

const AverageFavoritesDistributionPerAdBoostingChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/nb-moyen-favorites-par-annonce-boost');
        const boostSuccessRateData = await response.json();

        let months = [];
        let boostedData = [];
        let nonBoostedData = [];
        let totalData = [];

        for (let year in boostSuccessRateData) {
          for (let month in boostSuccessRateData[year]) {
            months.push(month + '/' + year);
            for (let type in boostSuccessRateData[year][month]) {
              if (type == 'Boosted') {
                boostedData.push(boostSuccessRateData[year][month][type]);
              } else if (type == 'Non boosted') {
                nonBoostedData.push(boostSuccessRateData[year][month][type]);
              } else if (type == 'Total') {
                totalData.push(boostSuccessRateData[year][month][type]);
              }
            }
          }
        }

        let trace1 = {
          x: months,
          y: boostedData,
          name: 'Annonce boostée',
          type: 'bar',
          hovertemplate: '  %{y}     '
        };

        let trace2 = {
          x: months,
          y: totalData,
          name: 'Annonce boostée et non boostée        ',
          type: 'bar',
          hovertemplate: '  %{y}     '
        };

        let trace3 = {
          x: months,
          y: nonBoostedData,
          name: 'Annonce non boostée',
          type: 'bar',
          hovertemplate: '  %{y}     '
        };

        setData([trace1, trace2, trace3]);
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
        data={data}
        layout={{
          title: {
            text: 'Distribution moyenne de mises en favori par annonce'
          },
          barmode: 'group',
          yaxis: {
            title: {
              text: 'Nombre moyen de mises en favori'
            }
          }
        }}
        useResizeHandler={true}
      />

      <InformationIcon
        text={
          <div>
            <p>
              {'Utilité du graphique :'}
              <br></br>
              {
                'Ce graphique représente, par mois, le nombre moyen de mises en favori par annonce selon si elle est boostée ou non. Une annonce boostée est une annonce qui est mise en avant par la plateforme en échange d\'un paiement. Le bien concerné est ainsi censé trouver preneur/se plus rapidement. Ce graphique permet à l\'agent immobilier de savoir si "booster" une annonce a réellement une influence sur son succès.'
              }
            </p>
            <p>
              {'Observation :'}
              <br></br>
              {
                "Nous constatons que, paradoxalement, une annonce boostée a souvent moins de succès qu'une annonce non boostée. En effet, sur les 14 mois sélectionnés, huit voit le nombre moyen de mises en favori par annonce non boostée dépasser celui par annonce boostée. Dans certains cas (3/2024 ou 5/2024), la différence est très élevée (exemple 3/2024 : boostée = 35,3 mises en favori & non boostée = 284 mises en favori). Il semble donc qu'il n'est pas utile, pour l'offreur, de booster son annonce. Cependant, l'absence des annonces de biens vendus nuance ce résultat. Par exemple, en mars 2024, il ne serait pas surprenant d'imaginer que si les biens boostés déjà vendus étaient pris en compte, le nombre moyen de mises en favori soit beaucoup plus élevé."
              }
            </p>
          </div>
        }
      />
    </div>
  );
};

export default AverageFavoritesDistributionPerAdBoostingChart;
