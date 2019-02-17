Objectif: Afficher sur une page web la liste des hotels-restaurants(relais chateaux),
en fonction du prix avec un restaurant classé au guide michelin 2019.

Pour recuperer les prix des hotels-restaurantS ansi que la liste des restaurantS,
nous aurons besoin de la librairie puppeteer afin de faire du web scraping.

Dans le but de racourcire la demonstration et étant donné que le web scraping peut se montrer long, 
(plusieurs tentatives afin que la requete HTTP aboutisse), deux scripts indépendants ont étés créés et retournent,
deux fichiers json qui seront utlisés dans le fichier index.js,
qui se charge de la creation d'une page html. 


****************************************************************************************************

Résumé:

fichier "script_creation_json_hotel_restaurant.js":
  * retourne le fichier JSON: hotel_restaurant.json
  
fichier "script_creation_json_michelin_etoiles.js":
  * retourne le fichier JSON: restaurant_michelin.json	
  
fichier "index.js":
  * Application d'un traitement sur les chaines de caracteres,
    des fichiers  hotel_restaurant.json et restaurant_michelin.json,
    et retournent la liste finale des hotels-restaurants classé au guide michelin
    (via une comparaison)
  * Cette liste finale est utilisée pour generer le code HTLM qui présente sur une page,
    le nom, le prix ainsi qu'un lien direct de la page de l'hotel-restaurant
  * L'adresse de la page web est la suivante: http://127.0.0.1:8888

