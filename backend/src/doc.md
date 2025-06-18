# POST request boulder

al momento la post request con userid funziona solo se c é un user con id=1 dentro il db. occorre entrare dentro il docker container postgresql ed inserire manualmente un utente.

se non si é inserito un utente basta non inserire il campo userId nel body
{
"name": "Cactus Wall",
"description": "Un traverso su microtacche con uscita tecnica.",
"difficulty": "medio",
"latitude": 45.4781,
"longitude": 9.2325,
"createdAt": "2025-06-18T14:30:00.000Z",
// no userId
}
