You need internet run this project, becouse the database is in the cloud.
//TODO

# Clone

Use `git clone https://github.com/guillodacosta/almundo-back.git` to clone this project.

## Install dependencies

run `npm install` to download the depencies.

## Development server

Run `npm start` to run the server.

## API ROUTES


| Method | Route                    | Functionality            |
| ---    | ---                      | ---                      |
| GET    | api/hotels               | Return the list of hotels      |
| GET    | api/hotels?filter={}     | Filter the hotels ex filter = {"name": "hotel"} will return all hotels that contain the word 'hotel' and {"name": "hotel", "price": 2083} will return the hotels that contain hotel and price is equal to 2083 |
| GET    | api/hotels/:id           | return an hotel         |
| POST   | api/hotels               | Save one or more hotels (you can send an object or an array)     |
| DELETE | api/hotels/:id           | Remove an hotel          |
| PUT    | api/hotels/:id           | Update an hotel         |



