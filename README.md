<h2>It's necessary Node.js, Postgres and npm</h2>

<h3>Clone Repository</h3>
<p>git clone https://github.com/HarnonA/backend-test.git</p>

<h3>Go to server folder</h3>
<p>cd backend-test</p>

<h3>Install Dependencies</h3>
<p>npm i</p>

<h3>Postgres</h3>
<p>sudo -u postgres psql</p>
<p>CREATE DATABASE rogalabsdb;</p>
<p> * you must insert your postgres password in <b>knexfile.js</b> *</p>

<h3>Migration</h3>
<p>npm run migrate</p>

<h3>Run server</h3>
<p>npm start</p>




