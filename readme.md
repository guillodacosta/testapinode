You need internet run this project, becouse the database is in the cloud.


# Clone

Use `git clone https://github.com/oscarpr/almundo-back.git` to clone this project.

## Install depencies

run `npm install` to download the depencies.

## Development server

Run `npm start` to run the server.

## API ROUTES


| Method | Rute                  | Functionality            |
| ---  | ---  | ---    |
| GET    | /hotels               | Return the list of hotels      |
| GET    | /hotels?filter={}     | Filter the hotels ex filter = {"name": "hotel"} will return all hotels that contain the word 'hotel' and {"name": "hotel", "price": 2083} will return the hotels that contain hotel and price is equal to 2083 |
| GET    | /hotels/:id           | return an hotel         |
| POST   | /hotels               | Save one or more hotels (you can send an object or an array)     |
| DELETE | /hotels/:id           | Remove an hotel          |
| PUT    | /hotels/:id           | Update an hotel         |



