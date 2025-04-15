import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import InformationIcon from './InformationIcon';

const AverageFavoritesDistributionPerSellerTypeChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/nb-moyen-favorites-par-type-vendeur-annonce');
        const sellerTypeData = await response.json();

        let months = [];
        let privateData = [];
        let proData = [];
        let totalData = [];

        for (let year in sellerTypeData) {
          for (let month in sellerTypeData[year]) {
            months.push(month + '/' + year);
            for (let type in sellerTypeData[year][month]) {
              if (type == 'private') {
                privateData.push(sellerTypeData[year][month][type]);
              } else if (type == 'pro') {
                proData.push(sellerTypeData[year][month][type]);
              } else if (type == 'Total') {
                totalData.push(sellerTypeData[year][month][type]);
              }
            }
          }
        }

        setData([
          {
            x: months,
            y: privateData,
            name: 'Particulier',
            type: 'bar',
            hovertemplate: '  %{y}     '
          },
          {
            x: months,
            y: totalData,
            name: 'Tout type de vendeur/se     ',
            type: 'bar',
            hovertemplate: '  %{y}     '
          },
          {
            x: months,
            y: proData,
            name: 'Professionel/le    ',
            type: 'bar',
            hovertemplate: '  %{y}     '
          }
        ]);
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
            text: 'Distribution moyenne de mises en favori par type de vendeur/se'
          },
          barmode: 'group',
          legend: {
            orientation: 'h'
          },
          hoverlabel: {
            font: {
              size: 12
            }
          },
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
                "Ce graphique représente, par mois, le nombre moyen de mises en favori par annonce selon le type de vendeur/se (professionel/le ou particulier). Ce graphique permet à l'agent immobilier de savoir si le fait d'être un/e professionnelle favorise le succès d'une annonce."
              }
            </p>
            <p>
              {'Observation :'}
              <br></br>
              {
                "Nous constatons que, sur les trois mois sélectionnés, une annonce d'un particulier a toujours plus de succès qu'une annonce d'un/e professionel/le. Cependant, l'absence des annonces de biens vendus pourrait nous laisser penser que les biens proposés par des professionnels/lles ont, en moyenne, moins de mises en favori car, parmi ces biens, beaucoup ont trouvé preneur/se alors que ceux des particuliers sont populaires virtuellement mais très peu achetés. De plus, toutes les annonces antérieures à 2025 (non présent sur le graphique) sont des annonces professionnelles. Cela peut signifier soit que les biens proposés par des particuliers ont tous trouvé preneur/se, soit que les annonces professionnelles sont majoritaires par rapport à celles des particuliers. Dans la première situation, cela indiquerait à l'agent immobilier qu'être professionnel/le n'est pas une garantie de succès dans la vente d'un bien. Le deuxième cas pourrait simplement être la conséquence d'une activité de ventes plus grande chez les agents, ce qui semblerait logique et n'indiquerait pas forcément un manque d'attractivité pour les annonces immobilières."
              }
            </p>
          </div>
        }
      />
    </div>
  );
};

export default AverageFavoritesDistributionPerSellerTypeChart;
