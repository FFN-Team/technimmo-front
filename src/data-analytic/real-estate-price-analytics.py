import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

# Charger les données
df = pd.read_csv("dataset_annonces.csv", delimiter=";")  # Remplace par le bon fichier

# # 1. Statistiques descriptives des prix
# print("Statistiques descriptives du prix des biens :")
# print(df['Price'].describe())

# # 2. Analyse du prix au m²
# df['price_per_m2'] = df['Price'] / df['square']
# print("Statistiques du prix au m² :")
# print(df['price_per_m2'].describe())

# # 3. Visualisation de la distribution des prix
# plt.figure(figsize=(10, 5))
# sns.histplot(df['Price'], bins=50, kde=True)
# plt.title("Distribution des prix des biens immobiliers")
# plt.xlabel("Prix (€)")
# plt.ylabel("Nombre d'annonces")
# plt.show()

# # 4. Évolution des prix (comparaison avec old_price)
# df['price_variation'] = df['Price'] - df['old_price']
# plt.figure(figsize=(10, 5))
# sns.histplot(df['price_variation'], bins=50, kde=True)
# plt.title("Variation des prix des biens immobiliers")
# plt.xlabel("Différence de prix (€)")
# plt.ylabel("Nombre d'annonces")
# plt.show()

# # 5. Impact des caractéristiques sur le prix
# features = ['square', 'rooms', 'bedrooms', 'nb_bathrooms', 'building_year', 'ges']
# for feature in features:
#     plt.figure(figsize=(10, 5))
#     sns.scatterplot(x=df[feature], y=df['Price'])
#     plt.title(f"Impact de {feature} sur le prix")
#     plt.xlabel(feature)
#     plt.ylabel("Prix (€)")
#     plt.show()

# # 6. Corrélation entre les variables
# plt.figure(figsize=(10, 5))
# sns.heatmap(df[['Price', 'square', 'rooms', 'bedrooms', 'nb_bathrooms', 'building_year']].corr(), annot=True, cmap='coolwarm', fmt='.2f')
# plt.title("Matrice de corrélation entre prix et caractéristiques")
# plt.show()


# Visualisation de l'impact des chambres sur le prix
plt.figure(figsize=(10, 5))
sns.boxplot(x="bedrooms", y="Price", data=df)
plt.title("Impact du nombre de chambres sur le prix")
plt.show()