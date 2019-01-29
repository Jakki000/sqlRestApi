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
### Lisää tapahtuma
```
POST /transactions
```
Esimerkki pyynnöstä
```
{
    "rahanarvo": 3.45,
    "aika": "2019-01-18T07:44:13.000Z",
    "SP_ID": 1
}
```