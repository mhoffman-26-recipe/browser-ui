# browser-ui-recipe
A full-stack React and NestJS web application for managing personal recipe collections.  
Create, organize, and explore recipe books with intuitive user interface and dynamic content management.


## Local Installation

First, you need to have `nvm` installed.

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
* Not all packages are used right now, there are some packges that we can delete, i have used a template repo.
* I have payed attention to use meaningfull commits
### Backend

* I have choosed to implement a simple In memory cache client for data mangemnt, so it would be easier and fast to create this project.
* I created integration test, using jest


## CI/CD flow

```sh
docker build -t browser-ui-recipe:v1.0.0 .

docker run --name browser-ui-recipe-container -d -p 80:9090 browser-ui-recipe:v1.0.0
```