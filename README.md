# Sadarada
This web application using a mobile positioning is being developed to make folklore more popular.

# Running front-end only

## prequisites
working Node.js installation https://nodejs.org/en/

## run local server
cd frontend
npm install
npm run dev

# Build locally

## prequisites
java 8
maven https://maven.apache.org/download.cgi

## on first run
mvn clean install

## later
mvn install

## Starting local server
mvn --projects backend spring-boot:run

Navigate to http://localhost:8080
