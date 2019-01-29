# REST-API SÄÄSTÖPOSSU

REST-API säästöpossu projektia varten.

## Aloitus

```javascript
  npm install
```

Voit käynnistää palvelimen näin

```
npm start
```

## Endpointit
### Hae tapahtumat
```
GET /transactions
```
```
GET /transactions/{tapahtumaId}
```
Hae tietyn possun tapahtumat
```
GET /transactions/piggybank/{SP_ID}
```
Esimerkki vastauksesta
```json
{
    "status": 200, 
    "error": null, 
    "response":[{
            "ID":1,
            "Timestamp":"2018-09-20T10:32:53.000Z",
            "SP_ID":1,
            "Rahanarvo":3
            }]
}
```
```json
{
    "status": 400, 
    "error": "invalid id", 
}
```
```json
{
    "status": 400, 
    "error": "Bad request",
}
```

### Lisää tapahtuma
```
POST /transactions
```
Esimerkki pyynnöstä
```json
{
    "rahanarvo": 3.45,
    "SP_ID": 1
}
```
Esimerkki vastauksesta
```json
{
    "message": "success",
    "status": 200
}
```
```json
{
    "status": 400, 
    "error": "Bad request",
}
```

### Hae käyttäjät
```
GET /users
```
```
GET /users/{käyttäjäId}
```

### Lisää käyttäjä
```
POST /users
```
Esimerkki pyynnöstä
```json
{
    "kayttajanimi": "aaaa",
    "salasana": "bbbbbb",
    "etunimi": "Matti",
    "sukunimi": "Meikäläinen"
}
```
Esimerkki vastauksesta

GET
```json
{
    "status": 200, 
    "error": null, 
    "response":[{
            "ID":1,
            "Käyttäjänimi":"Aaaa",
            "Salasana":"aaaaaa",
            "Etunimi":"aaaa",
            "Sukunimi":"aaa"
            }]
}
```
POST
```json
{
    "message": "success",
    "status": 200
}
```
GET/POST
```json
{
    "status": 400, 
    "error": "Bad request",
}
```