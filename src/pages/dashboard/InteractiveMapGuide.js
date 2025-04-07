import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function InteractiveMapGuide() {
  return (
    <Box maxWidth="lg" mx="auto" px={4} py={6}>
      {/* 1. Introduction */}
      <section>
        <Typography variant="h4" color="primary" gutterBottom>
          🏁 1. Introduction : Naviguer avec la carte
        </Typography>
        <Typography variant="body1" paragraph>
          Bienvenue sur la carte interactive des dynamiques immobilières locales. Dès l’ouverture de l’interface, vous accédez à une carte géographique interactive, centrée sur votre région d’activité. Celle-ci a été conçue pour synthétiser visuellement des informations clés du marché, et vous permettre d’adapter vos actions commerciales en temps réel.
        </Typography>
      </section>

      <Divider sx={{ my: 4 }} />

      {/* 2. Changer de perspective */}
      <section>
        <Typography variant="h4" color="primary" gutterBottom>
          🔀 2. Changer de perspective avec le mode d’affichage
        </Typography>
        <Typography variant="body1" paragraph>
          Deux modes de lecture sont disponibles via les boutons en haut à gauche :
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="🗂️ “Annonces” : permet d’évaluer le volume de biens en ligne par commune." />
          </ListItem>
          <ListItem>
            <ListItemText primary="💶 “Prix” : révèle le prix moyen au m² estimé dans chaque secteur." />
          </ListItem>
        </List>
        <Typography variant="body2" color="textSecondary">
          💡 Utilisez ce switch pour croiser les données : un quartier très actif (beaucoup d’annonces) mais à prix modéré peut être une opportunité à fort potentiel.
        </Typography>
      </section>

      <Divider sx={{ my: 4 }} />

      {/* 3. Explorer les communes */}
      <section>
        <Typography variant="h4" color="primary" gutterBottom>
          📍 3. Explorer les communes
        </Typography>
        <Typography variant="body1" paragraph>
          Chaque commune est représentée par une zone colorée. Plus la teinte est chaude 🔴, plus le volume (ou le prix) est élevé.
        </Typography>
        <Typography variant="body2" color="textSecondary" paragraph>
          Un tooltip au survol affiche instantanément :
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Le nom de la ville" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Le nombre d’annonces" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Le prix moyen au m²" />
          </ListItem>
        </List>
      </section>

      <Divider sx={{ my: 4 }} />

      {/* 4. Cibler les annonces populaires */}
      <section>
        <Typography variant="h4" color="primary" gutterBottom>
          ❤️ 4. Cibler les annonces populaires
        </Typography>
        <Typography variant="body1" paragraph>
          Cochez “Annonces populaires” pour faire apparaître les biens ayant généré le plus de favoris (représentés par des marqueurs roses 💗).
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Repérer les types de biens qui séduisent le plus." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Analyser la demande réelle des acheteurs potentiels." />
          </ListItem>
          <ListItem>
            <ListItemText primary="Comprendre quels quartiers déclenchent de l’engagement." />
          </ListItem>
        </List>
      </section>

      <Divider sx={{ my: 4 }} />

      {/* 5. Repérer les annonces stagnantes */}
      <section>
        <Typography variant="h4" color="primary" gutterBottom>
          ⌛ 5. Repérer les annonces stagnantes
        </Typography>
        <Typography variant="body1" paragraph>
          Activez “Annonces stagnantes” pour identifier les biens restés longtemps en ligne (marqueurs orange ⏳).
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="De détecter les biens surestimés ou mal positionnés." />
          </ListItem>
          <ListItem>
            <ListItemText primary="D’identifier les zones où les acheteurs sont frileux." />
          </ListItem>
          <ListItem>
            <ListItemText primary="D’ajuster vos propres estimations ou recommandations à vos clients vendeurs." />
          </ListItem>
        </List>
      </section>

      <Divider sx={{ my: 4 }} />

      {/* 6. Focus sur une commune */}
      <section>
        <Typography variant="h4" color="primary" gutterBottom>
          🧠 6. Focus sur une commune
        </Typography>
        <Typography variant="body1" paragraph>
          En cliquant sur une commune, vous ouvrez un panneau latéral qui détaille :
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Le nombre total d’annonces" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Le prix moyen au m²" />
          </ListItem>
          <ListItem>
            <ListItemText primary="D’autres indicateurs à personnaliser (types de biens, évolution, etc.)" />
          </ListItem>
        </List>
      </section>

      <Divider sx={{ my: 4 }} />

      {/* 7. Conseils d’analyse stratégique */}
      <section>
        <Typography variant="h4" color="primary" gutterBottom>
          🧰 7. Conseils d’analyse stratégique
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Question</TableCell>
                <TableCell>Ce que ça révèle</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Pourquoi ce secteur est-il saturé en annonces ?</TableCell>
                <TableCell>Offre supérieure à la demande ?</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pourquoi ce bien est-il populaire ?</TableCell>
                <TableCell>Bon rapport qualité/prix ? Bonne mise en avant ?</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Pourquoi certains biens stagnent ?</TableCell>
                <TableCell>Problème de prix ? Photos ? Description ?</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Y a-t-il des zones chaudes en prix mais froides en annonces ?</TableCell>
                <TableCell>Tension latente du marché ? Opportunité de rentrer des mandats ?</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Des quartiers autrefois calmes sont-ils devenus plus actifs ?</TableCell>
                <TableCell>Mutation locale ? Nouvel attrait ?</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </section>

      <Divider sx={{ my: 4 }} />

      {/* 8. Utilisation terrain */}
      <section>
        <Typography variant="h4" color="primary" gutterBottom>
          🚀 8. Utilisation terrain
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Argumenter un prix de vente basé sur la réalité locale" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Rassurer un acheteur sur l’attractivité d’un quartier" />
          </ListItem>
          <ListItem>
            <ListItemText primary="Démontrer votre expertise du marché à vos prospects" />
          </ListItem>
        </List>
      </section>

      <Divider sx={{ my: 4 }} />

      {/* Conclusion */}
      <section>
        <Typography variant="h4" color="primary" gutterBottom>
          ✨ Conclusion personnalisée
        </Typography>
        <Typography variant="body1">
          Avec cet outil, vous ne suivez plus le marché, vous l’anticipez.
        </Typography>
      </section>
    </Box>
  );
}
