<div id="top"></div>

<!-- PROJECT LOGO -->

<br />
<div align="center">
  <h1 align="center">Ignite Gym api</h3>
</div>

<!-- TABLE OF CONTENTS -->

## Contents

<p align="center">
    <p><a href="#about-the-project" title=" go to About the Project">About The Project</a></p>
    <p><a href="#running-locally" title=" go to Running locally">Running locally</a></p>
    <p><a href="#routes" title=" go to Routes">Routes</a></p>
    <p><a href="#contact" title=" go to Contact">Contact</a></p>
  </p>

<br>
<!-- ABOUT THE PROJECT -->

# About The Project

Daily Diet api, challenge 2 from ignite nodeJS from rocketseat.

GymPass style app.

## RFs (Functional requirements)

- [X] It must be possible to register;
- [X] It must be possible to authenticate;
- [X] It must be possible to obtain the profile of a logged in user;
- [X] It must be possible to obtain the number of check-ins performed by the logged-in user;
- [X] It must be possible for the user to obtain his check-in history;
- [X] It must be possible for the user to search for nearby gyms (under 10km);
- [X] It must be possible for the user to search for gyms by name;
- [X] It must be possible for the user to check-in at a gym;
- [X] It must be possible to validate a user's check-in;
- [X] It must be possible to register an academy;

## RNs (Business rules)

- [X] The user must not be able to register with a duplicate email;
- [X] The user cannot make 2 check-ins on the same day;
- [X] User cannot check-in if they are not close (100m) to the gym;
- [X] Check-in can only be validated up to 20 minutes after being created;
- [ ] Check-in can only be validated by administrators;
- [ ] The academy can only be registered by administrators;

## RNFs (Non-functional requirements)

- [X] The user's password must be encrypted;
- [X] Application data must be persisted in a PostgreSQL database;
- [X] All data lists must be paginated with 20 items per page;
- [ ] The user must be identified by a JWT (JSON Web Token);

<br>

# Running locally

```bash
# Clone this repository
$ git clone https://github.com/bielpatricio/api-ignite-gym
# Access the project folder in your terminal
$ cd api-ignite-gym
# Install the dependencies
$ npm i
# Run the docker
$ docker compose up -d
# Run the application in development mode
$ npm run dev
# The application will runing on port 3333, so you can access the url http://localhost:3333/ to do the requests.
# Run the tests
$ npm test:users
$ npm test:meals
```

# Routes

For the project, some routes were created:

## User

```
  1. Create a user
    (POST) http://localhost:3333/users
    1.1 body
      {
          "username": "bieu",
          "email": "bieu@gmail.com",
          "password": "123",
          "confirmPassword": "123"
      }

  2. Login a user
    (PUT) http://localhost:3333/users/login
    2.1 body
      {
          "username": "bieu",
          "password": "123"
      }

  3. Get a user
    (GET) http://localhost:3333/users

    response example:

      {
          "total": 5,
          "totalInDiet": 4,
          "totalOutDiet": 1,
          "BestSequence": 3,
          "user": {
              "id": "ffa20cb0-a010-4aae-976a-91070cb779b6",
              "username": "bieu",
              "email": "bieu@gmail.com",
          }
      }

  4. Delete a user
    (DELETE) http://localhost:3333/users/:id
```

## Meal

```
  1. Create a meal
    (POST) http://localhost:3333/meals
    1.1 body
      {
          "name": "jantar",
          "description": "ovos e cuscuz",
          "inDiet": true,
          "date": "{{currentdate}}"
      }

  2. Put a meal
    (PUT) http://localhost:3333/meals/:id
    2.1 body
      {
          "name": "Cafe",
          "description": "ovos e mamão",
          "inDiet": true,
          "date": "{{currentdate}}"
      }

  3. Get a meal by id
    (GET) http://localhost:3333/meals/:id

    response example:

      {
          "id": "84ceba1d-ebc8-4508-9507-6efcbf490544",
          "session_id": "93d3e512-32be-45ae-b055-7e704ff2ce13",
          "name": "Cafe",
          "description": "ovos e mamão",
          "date": "2023-06-19T15:42:11-03:00",
          "inDiet": true,
          "createdAt": "2023-06-19 17:15:12",
          "updatedAt": "2023-06-19 18:42:11"
      }

  4. Get all meals
      (GET) http://localhost:3333/meals
  
      response example:
  
        {
            "total": 2,
            "meals": [
                {
                    "id": "84ceba1d-ebc8-4508-9507-6efcbf490544",
                    "session_id": "93d3e512-32be-45ae-b055-7e704ff2ce13",
                    "name": "Cafe",
                    "description": "ovos e mamão",
                    "date": "2023-06-19T15:42:11-03:00",
                    "inDiet": true,
                    "createdAt": "2023-06-19 17:15:12",
                    "updatedAt": "2023-06-19 18:42:11"
                },
                {
                    "id": "8323b7c9-4c7a-4871-97ce-614239d96b79",
                    "session_id": "93d3e512-32be-45ae-b055-7e704ff2ce13",
                    "name": "janta",
                    "description": "ovo com bacon",
                    "date": "2023-06-19T14:15:21-03:00",
                    "inDiet": false,
                    "createdAt": "2023-06-19 17:15:21",
                    "updatedAt": "2023-06-19 17:47:51"
                },
            ]
        }


  5. Delete a meal
    (DELETE) http://localhost:3333/meals/:id
```

# Contact

Gabriel Patrício - gabrieltp087@gmail.com - [https://github.com/bielpatricio/](https://github.com/bielpatricio)

<p align="right">(<a href="#top">back to top</a>)</p>
