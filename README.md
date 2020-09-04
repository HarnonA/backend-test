<h2>It's necessary Node.js, Postgres and npm</h2>

<b> Clone Repository </b></br>
git clone https://github.com/HarnonA/backend-test.git

<b> Go to server folder </b></br>
cd backend-test

<b> Install Dependencies </b></br>
npm i

<b> Postgres </b></br>
sudo -u postgres psql
CREATE DATABASE rogalabsdb;</br>
!! you must insert your postgres password in <b>knexfile.js</br> !!

<b> Migration </b></br>
npm run migrate

<b> Run server </b></br>
npm start




