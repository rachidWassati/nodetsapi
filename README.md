# API Rest FULL pour une application type Uber eats



## Endpoints
### `POST /admin/restaurant`
Creation d'un nouveau restaurant

Exemple de body:
```
{
    "name": "Le Petit Bistro",
    "ownerName": "Isabelle Dupont",
    "foodTypes": ["French", "Seafood"],
    "postalcode": "75001",
    "address": "10 Rue de la Roquette",
    "phone": "01 45 67 89 10",
    "email": "lepetitbistro@gmail.com",
    "password": "qwerty"
}
```