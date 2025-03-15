from flask import Flask, render_template, jsonify, send_file
import pandas as pd
import folium
from folium.plugins import MarkerCluster, HeatMap
import os

app = Flask(__name__)

@app.route('/')
def index():
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

    # Créer un groupe de clusters
    marker_cluster = MarkerCluster().add_to(m)

    # Compter le nombre d'annonces par ville et calculer le prix moyen
    df_counts_by_city = df_annonces.groupby(["city", "latitude", "longitude"]).agg(
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
        popup=folium.Popup(f"<b>{row['city']}</b><br>Nombre d'annonces: {row['count']}<br>Prix moyen: {row['average_price']:.2f} €", max_width=250),
        icon=folium.Icon(color="blue", icon="info-sign"),
        tooltip=f"Cliquer pour plus d'infos sur {row['city']}"
    ).add_to(marker_cluster)

    # Sauvegarder la carte dans un fichier HTML
    file_path = "carte_avec_annonces.html"
    m.save(file_path)

    # Retourner le fichier HTML généré
    return send_file(file_path, mimetype='text/html')

if __name__ == '__main__':
    app.run(debug=True)
