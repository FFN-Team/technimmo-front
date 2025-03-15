import pandas as pd
import folium
from folium.plugins import HeatMap

# Charger le fichier JSON contenant plusieurs annonces
df = pd.read_json("exemple_annonces.json")

# Initialiser une liste vide pour stocker les informations des annonces
annonces = []

# Parcourir les annonces pour extraire les données nécessaires
for annonce in df['annonce']:
    # Extraire les informations 'city', 'lat', 'lng' et 'price' pour chaque annonce
    city = annonce.get("location").get("city")
    latitude = annonce.get("location").get("lat")
    longitude = annonce.get("location").get("lng")
    price = annonce.get("price")  # Extraire le prix
    
    # Ajouter les informations dans la liste
    annonces.append({"city": city, "latitude": latitude, "longitude": longitude, "price": price})

# Créer un DataFrame à partir de la liste des informations
df_locations = pd.DataFrame(annonces)

# Créer une carte centrée sur l'Île-de-France
m = folium.Map(location=[48.8566, 2.3522], zoom_start=10)

# Compter le nombre d'annonces par ville et calculer le prix moyen
df_counts_by_city = df_locations.groupby(["city", "latitude", "longitude"]).agg(
    count=('price', 'size'),
    average_price=('price', 'mean')
).reset_index()

# Ajouter la heatmap (densité d'annonces par ville/quartier)
heat_data = df_counts_by_city[["latitude", "longitude", "count"]].values.tolist()
HeatMap(heat_data, radius=15).add_to(m)

# Ajouter des marqueurs pour chaque ville avec le nombre d'annonces et le prix moyen
for _, row in df_counts_by_city.iterrows():
    folium.Marker(
        location=[row["latitude"], row["longitude"]],
        popup=f"{row['city']}: {row['count']} annonces\nPrix moyen: {row['average_price']:.2f} €",
        icon=folium.Icon(color="blue", icon="info-sign")
    ).add_to(m)

# Sauvegarder la carte dans un fichier HTML
m.save("heatmap_annonces_avec_prix_moyen.html")