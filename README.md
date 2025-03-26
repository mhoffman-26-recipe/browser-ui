# browser-ui-recipe

A full-stack React and Node.js web application for managing personal recipe collections.  
Create, organize, and explore recipe books with intuitive user interface and dynamic content management.

## Table of Contents

- [Local Installation](#local-installation)
  - [Prerequisites](#prerequisites)
  - [Build Frontend](#build-frontend)
  - [Build the Backend Server](#build-the-backend-server)
- [Attention Some Extra Notes](#attention-some-extra-notes)
  - [Backend](#backend)
- [CI/CD Flow](#cicd-flow)

## Local Installation

### Prerequisites

- Node.js (use `nvm` for version management)
- Docker Desktop with K8S enabled.
- kubectl CLI

### Local Kafka Setup

#### Step 1: Enable Network For Kafka

1. Configure Local Host Resolution

   ```bash
   # Edit hosts file with admin privileges
   sudo nano /etc/hosts

   # Add the following line
   127.0.0.1 kafka
   ```

   Save the file

#### Step 2: Kubernetes Local Setup

1. Prerequisites:

   - Ensure your Kubernetes cluster is running

2. Clone the deploy Repo, [link](https://github.com/mhoffman-26-recipe/recipe-deploy)
3. Now do apply for all kafka resources,
   run this commands (order is importent):

```bash
kubectl apply -f recipe-deploy/k8s/kafka/zk.yaml
kubectl apply -f recipe-deploy/k8s/kafka/kafka-main.yaml
kubectl apply -f recipe-deploy/k8s/kafka/k-ui.yaml
```

4. make sure the resources created.  
   run

```bash
kubectl get pods -n kafka
```

you would get output similar to this:
```bash
NAME                        READY   STATUS    RESTARTS   AGE
kafka-0                     1/1     Running   0          7s
kafka-ui-6cfccc4ddf-9lbmp   1/1     Running   0          7s
zookeeper-0                 1/1     Running   0          7s
```

4. Make sure you able to connect to the Kafka-Ui at "http://localhost:32020/",   
check that the cluster is online and you have 1 broker availible.

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
