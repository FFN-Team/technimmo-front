import React, { useState } from "react";
import { Card, CardContent, Tabs, Tab, Box, Button, Collapse } from "@mui/material";
import 'pages/components/Onglets.css';

const data = [
  {
    ongletTitle: "📍 Le territoire",
    title: "📍 Le territoire : des contrastes révélateurs",
    content: `Les Hauts-de-Seine offrent une cartographie immobilière en claire tension entre cœur urbain et périphérie.
À l’extrémité nord, Villeneuve-la-Garenne affiche les prix les plus bas du département. En remontant vers Paris, les prix grimpent : Levallois-Perret culmine à 11 009 €/m², pour seulement 3 annonces. Une rareté qui traduit une demande très supérieure à l’offre.
Globalement, le prix au m² augmente à mesure qu’on s’approche de la petite couronne, illustrant un effet de centralité classique.`,
tip:`💡 À retenir : Ce gradient est une boussole pour affiner vos estimations et segmenter vos prospects selon leur budget et leurs attentes.`
  },
  {
    ongletTitle: "🔍 Offre vs Demande",
    title: "🔍 Offre vs Demande : où le marché coince-t-il ?",
    content: `Votre carte révèle des zones où l’offre sature sans déclencher l’achat : une donnée clé pour détecter les tensions cachées.
Le sud du département, notamment Antony et Fontenay-aux-Roses, concentre un nombre élevé d’annonces stagnantes.
À l’inverse, dans les villes proches de Paris, l’offre est quasiment absente.`,
    tip:`💡 Lecture agent :
- Là où les biens ne se vendent pas, il y a besoin de repositionnement : ajuster le prix, améliorer les visuels, renouveler la stratégie.
- Là où il n’y a presque rien à vendre, chaque bien est une opportunité rare : argument de poids pour prendre un mandat.`
  },
  {
    ongletTitle: "❤️ Comportement des acheteurs",
    title: "❤️ Comportement des acheteurs : où va l’attention ?",
    content: `En analysant les favoris des internautes, on distingue deux dynamiques : (1) Une zone sud avec de nombreuses annonces moyennement populaires (100 à 600 likes). Un signe d’intérêt diffus, mais pas toujours décisif. (2) Des “pépites” au centre du département, où quelques biens concentrent l’engagement :
    - Suresnes : 1 554 favoris  
    - Saint-Cloud : 1 074 favoris
    - Sèvres : 1 035 favoris 
    - Rueil-Malmaison : 878 favoris`,
    tip: `💡 Lecture agent : Ces biens stars doivent être disséqués : quel type ? quelle présentation ? quel prix ? Inspirez-vous de ce qui fonctionne pour vos futurs mandats.`
  },
  {
    ongletTitle: "🔄 Comprendre l’inertie",
    title: "🔄 Comprendre l’inertie : que disent les biens en souffrance ?",
    content: `Certaines annonces dépassent les 400 jours de présence en ligne à Montrouge ou Clamart. Une stagnation aussi longue indique un décrochage total du marché.`,
    tip: `💡 Lecture agent : Ce sont des mandats à reprendre.
1) Proposez une approche nouvelle : home staging digital, repositionnement prix, storytelling de quartier.
2) Apportez votre valeur ajoutée de professionnel face à des propriétaires désabusés.`
  },
  {
    ongletTitle: "🛠️ Zones actives",
    title: "🛠️ Zones actives : là où il faut être visible",
    content: `Des villes comme Colombes, Nanterre, Rueil-Malmaison, Antony et Clamart concentrent beaucoup d’annonces. Ces zones sont dynamiques mais aussi compétitives.`,
    tip: `💡 Lecture agent : 
1) Positionnez-vous comme expert local : sortez régulièrement des bilans sectoriels.
2) Montrez à vos prospects que vous maîtrisez parfaitement les dynamiques locales.
3) Être visible et pertinent dans ces zones, c’est gagner la confiance et les mandats.`
  },
  {
    ongletTitle: "💼 Recommandations",
    title: "💼 Recommandations Métiers",
    tip: `1) Travaillez la rareté : peu d’annonces en petite couronne ? Allez chercher les vendeurs.
2) Activez les biens bloqués : relancez les propriétaires qui stagnent.
3) Valorisez votre savoir : utilisez ces données en entretien de mandat pour montrer votre maîtrise du marché.
4) Inspirez-vous des annonces populaires pour booster l’attractivité de vos biens.`
  }
];

export default function RealEstateInsights() {
  const [tabIndex, setTabIndex] = useState(0);
  const [expanded, setExpanded] = useState(Array(data.length).fill(false));

  const toggleExpand = (index) => {
    setExpanded((prev) => {
      const newExpanded = [...prev];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  return (
    <Box className="p-6 max-w-5xl mx-auto">
      <Tabs
        value={tabIndex}
        onChange={(e, newIndex) => setTabIndex(newIndex)}
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        aria-label="Real Estate Tabs"
        className="custom-tabs"
        sx={{
            '& .MuiTabs-indicator': {
            backgroundColor: 'transparent', // Optionnel : retirer la ligne d'indicateur bleue
            },
            '& .MuiTab-root:focus': {
            outline: 'none', // Supprime l'effet de halo bleu au focus
            }
        }}
        >
        {data.map((section, index) => (
            <Tab
            key={index}
            label={section.ongletTitle}
            sx={{
                '&:focus': {
                outline: 'none',
                },
            }}
            />
        ))}
        </Tabs>

      {data.map((section, index) => (
        <Collapse key={index} in={tabIndex === index} timeout="auto" unmountOnExit>
          <Card
          >
            <CardContent>
            <h2 className="text-xl font-semibold mb-4 text-gray-800">{section.title}</h2>
            <p className="whitespace-pre-line text-sm text-gray-700 mb-4">{section.content && section.content.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                        {line}<br/>
                    </React.Fragment>
                    ))}</p>

            <Button
                variant="contained"
                size="small"
                onClick={() => toggleExpand(index)}
                sx={{
                mt: 2,
                backgroundColor: '#1976d2',
                color: 'white',
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: '#1565c0',
                },
                }}
                startIcon={expanded[index] ? '🔽' : '💡'}
            >
                {expanded[index] ? "Masquer les conseils" : "Voir les conseils stratégiques"}
            </Button>

            <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
                <Box
                    sx={{
                    backgroundColor: '#f0f4ff',
                    color: '#0d47a1',
                    p: 3,
                    mt: 3,
                    borderLeft: '4px solid #1976d2',
                    borderRadius: 2,
                    fontSize: '0.95rem',
                    lineHeight: 1.6,
                    }}
                >
                    {section.tip.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                        <strong>{line}</strong><br/>
                    </React.Fragment>
                    ))}
                </Box>
            </Collapse>

            </CardContent>

          </Card>
        </Collapse>
      ))}
    </Box>
  );
}
