import pandas as pd
import folium
from folium.plugins import HeatMap

# Charger le fichier JSON contenant plusieurs annonces
df = pd.read_json("exemple_annonces.json")

# Initialiser une liste vide pour stocker les informations des annonces
annonces = []

# Parcourir les annonces pour extraire les données nécessaires
for annonce in df['annonce']:
    city = annonce.get("location").get("city")
    latitude = annonce.get("location").get("lat")
    longitude = annonce.get("location").get("lng")
    price = annonce.get("price") 
    
    annonces.append({"city": city, "latitude": latitude, "longitude": longitude, "price": price})

# Créer un DataFrame à partir de la liste des informations
df_annonces = pd.DataFrame(annonces)

# Créer une carte centrée sur l'Île-de-France
m = folium.Map(location=[48.8566, 2.3522], zoom_start=10)

# Compter le nombre d'annonces par ville et calculer le prix moyen
df_counts_by_city = df_annonces.groupby(["city", "latitude", "longitude"]).agg(
    count=('price', 'size'),
    average_price=('price', 'mean')
).reset_index()

# Ajouter la heatmap
heat_data = df_counts_by_city[["latitude", "longitude", "count"]].values.tolist()
HeatMap(heat_data, radius=15).add_to(m)

# Ajouter des marqueurs pour chaque ville avec le nombre d'annonces et le prix moyen
for _, row in df_counts_by_city.iterrows():
    folium.Marker(
        location=[row["latitude"], row["longitude"]],
        popup=folium.Popup(f"<b>{row['city']}</b><br>Nombre d'annonces: {row['count']}<br>Prix moyen: {row['average_price']:.2f} €", max_width=250),
        icon=folium.Icon(color="blue", icon="info-sign"),
        tooltip=f"Cliquer pour plus d'infos sur {row['city']}"
    ).add_to(m)

# Lire le contenu du fichier HTML externe contenant la légende

# # Ajouter une légende
# legend_html = """
#     <div style="position: fixed; bottom: 50px; left: 50px; width: 150px; height: 100px; background-color: white; 
#                 border:2px solid black; z-index:9999; font-size:14px; font-family: Arial, sans-serif;">
#         <div style="background-color: #0000FF; height: 20px;"></div>
#         <div style="padding-left: 5px; font-size: 12px; color: black;">Annonces avec prix moyen</div>
#     </div>
# """
# m.get_root().html.add_child(folium.Element(legend_html))

# Ajouter un titre à la carte
title_html = '''
     <h3 align="center" style="font-size:20px"><b>Carte des Annonces Immobilières avec Prix Moyen</b></h3>
     '''
m.get_root().html.add_child(folium.Element(title_html))

# Sauvegarder la carte dans un fichier HTML
m.save("heatmap_annonces_avec_prix_moyen_ameliorée.html")
