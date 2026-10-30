# API reference

These endpoints return JSON. Order creation validates its request body before saving.

| Request | Success | Error |
| --- | --- | --- |
| `GET /api/dishes` | `200`, first page of dishes | — |
| `GET /api/dishes?search=kitfo&page=1&pageSize=2` | `200`, matching page | — |
| `GET /api/dishes/<id>` | `200`, one dish | `404` if missing |
| `POST /api/orders` | `201`, new order | `400` bad JSON; `422` invalid fields |
| `GET /api/orders/<id>` | `200`, safe status | `404` if missing |

Example requests for a running local app:

```bash
curl -i 'http://localhost:3000/api/dishes?search=kitfo&page=1&pageSize=2'
curl -i http://localhost:3000/api/orders/not-a-real-order
curl -i -X POST http://localhost:3000/api/orders -H 'content-type: application/json' --data '{"customerName":"Aster Example","email":"aster@example.com","phone":"+251 91 234 5678","deliveryAddress":"12 Example Street","neighbourhood":"Bole","orderDetails":"Doro Wat x 1"}'
```
