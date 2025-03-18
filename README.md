# browser-ui-recipe

A full-stack React and Node.js web application for managing personal recipe collections.  
Create, organize, and explore recipe books with intuitive user interface and dynamic content management.

## Table of Contents

- [Local Installation](#local-installation)
  - [Build Frontend](#build-frontend)
  - [Build the Backend Server](#build-the-backend-server)
- [Attention Some Extra Notes](#attention-some-extra-notes)
  - [Backend](#backend)
- [CI/CD Flow](#cicd-flow)

## Local Installation

- make sure you have `nvm` installed.
- for working with kafka do the following
In order to be able to work with Kafka:
1. Edit the `/etc/hosts` file with admin/sudo privileges:
   ```bash
   sudo nano /etc/hosts
   ```
2. Add the following line:
   ```
   127.0.0.1 kafka
   ```
3. Save the file and exit

you will need 2 terminals one for the frontend and one for the server.

### Build frontend

```bash
cd frontend
nvm use
npm ci
npm run build
```

### Build the backend server

Build the server, using a new terminal at the **main** folder

```bash
nvm use
npm ci
npm run start:dev
```

## Attention some extra notes

- Not all packages are used right now, there are some packges that we can delete, i have used a template repo.
- I have payed attention to use meaningfull commits

### Backend

- I have choosed to implement a simple In memory cache client for data mangemnt, so it would be easier and fast to create this project.
- I created integration test, using jest

## CI/CD flow

```sh
docker build -t browser-ui-recipe:v1.0.0 .

docker run --name browser-ui-recipe-container -d -p 80:9090 browser-ui-recipe:v1.0.0
```
