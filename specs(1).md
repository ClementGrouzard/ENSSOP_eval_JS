# API e-commerce

**Base URL**: `http://localhost:3000/api`

## Creation de session

créé une session utilisateur, il s'agit d'un "compte" sans username ni mdp qui permettera de sauvegarder le pannier. à
la création d'une session, l'API renvoie un **api-token** qui devra être envoyé avec certanes requêtes à l'api

### Request

**Path**: `/session`   
**Method**: `POST`

### Response

- `api-token`(**string**): token de la session à envoyer avec certaines requêtes

#### Example:

```json
{
  "api-token": "azertyuiop"
}
```

## Liste des valeurs pour les filtes

Donne la liste des valeurs acceptées pour le filtre `brand`, `color` et `size` pour rechercher des produits La réponse
contient 3 tableaux, un pour chaque filtre chaque valeur est représentée par un objet contenant:

- un id (valeur à envoyer à l'API pour filtrer)
- un nom (valeur à afficher à l'utilisateur)

### Request

**Path**: `/filters`   
**Method**: `GET`

### Response

- `brand`(**array**): liste des marques disponnibles
    - `id`(**integer**): id de la marque (à envoyer à l'API pour filtrer les produits)
    - `name`(**string**): nom de la marque à afficher à l'utilisateur
- `color`(**array**): liste des couleurs disponnibles
    - `id`(**integer**): id de la couleur (à envoyer à l'API pour filtrer les produits)
    - `name`(**string**): nom de la couleur à afficher à l'utilisateur
- `size`(**array**): liste des tailles disponnibles
    - `id`(**integer**): id de la taille (à envoyer à l'API pour filtrer les produits)
    - `name`(**string**): nom de la taille à afficher à l'utilisateur

#### Example:

```json
{
  "brand": [
    { "id":1, "name": "Samsung" },
    { "id":3, "name": "Segate" }
  ],
  "color": [
    { "id": 2, "name":  "Blanc" },
    { "id": 3, "name":  "Rose" }
  ],
  "size": [
    { "id": 1, "name":  "64Go" },
    { "id": 5, "name":  "1To" }
  ]
}
```

## Recherche produits

Renvoie le produits correspondants aux critères de recherche, si aucun critère n'est envoyé, tout les produits seront
renvoyés, si plusieurs critères sont envoyés, les produits correspondront à tout les critères

### Request

**Path**: `/products`   
**Method**: `GET`

#### Query parameters:

- `search`(**string**): texte recherché dans le titre ou la description
- `color`(**integer**): couleur du produit (id, voir liste des couleures)
- `size`(**integer**): espace dan la clé (id, voir liste des tailles)
- `brand`(**integer**): marque de la clé (id, voir liste des marques)

### Response

- `results`(**array**): liste des produits sous la forme d'un tableau d'objet
    - `id`(**integer**): id du produit
    - `name`(**string**): nom du produit
    - `price`(**integer**): prix du produit (en centimes)
    - `picture`(**string**): url de la photo du produit

#### Example:

```json
{
  "results": [
    {
      "id": 1,
      "name": "Super clé usb",
      "price": 1499,
      "picture": "https://picsum.photos/200/300"
    },
    {
      "id": 5,
      "name": "Une autre clé usb",
      "price": 5450,
      "picture": "https://picsum.photos/300/200"
    }
  ]
}
```

## Infos produit

Retourne toutes les informations sur un produit

### Request

**Path**: `/products/{id}`   
**Method**: `GET`

#### Path params

- `id`: id du produit recherché

### Response

- `id`(**integer**): id du produit
- `name`(**string**): nom du produit
- `price`(**integer**): prix du produit (en centimes)
- `picture`(**string**): url de la photo du produit
- `description`(**string**): description du produit
- `color`(**string|null**): couleur du produit
- `size`(**string|null**): taille du produit
- `brand`(**string|null**): marque du produit
- `stock`(**integer**): stock restant pour le produit

#### Example:

```json
{
  "id": 1,
  "name": "Super clé usb",
  "price": 1499,
  "picture": "https://picsum.photos/200/300",
  "description": "La meilleure clé USB du monde. Non vraiment je te le jure, test la et tu verras!!!",
  "color": "Noir",
  "size": "64Go",
  "brand": "Samsung"
}
```

## Ajout au pannier

Permet d'ajouter un produit au pannier, il sera sauvegardé dans le pannier lié à la session actuelle

### Request

**Path**: `/cart`   
**Method**: `POST`

#### Headers
 - `Authorization`(**string**): Token de session à laquelle on souhaite lier le produit (`api-token` dans le create session)

#### Body
- `product`(**integer**): id du produit à ajouter au pannier
- `qty`(**integer**): quantité du produit à ajouter au pannier (doit être inferiur au stock du produit)

### Response
 - `message`(**string**): Texte à afficher correspondant au résultat de l'action

Examples:
```json
{
  "message": "Produit ajouté au pannier"
}
```
```json
{
  "message": "Produit inconnu"
}
```
```json
{
  "message": "Stock insuffisant"
}
```


## infos pannier

## modification pannier

## validation pannier