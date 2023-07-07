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

Ignite gym api.

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
$ npm run test
# Run the tests and get a relatory
$ npm run test:coverage
# Run the tests and open a interface to see better
$ npm run test:ui
```

# Contact

Gabriel Patrício - gabrieltp087@gmail.com - [https://github.com/bielpatricio/](https://github.com/bielpatricio)

<p align="right">(<a href="#top">back to top</a>)</p>
