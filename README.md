# How to Run Application
You will need to install Docker Desktop if using Windows or MacOS. If on Linux, please ensure you have Docker installed

After installing Docker, extract the folder within the zip and navigate to it within your terminal.:

1. Open a terminal and navigate to the root of the project within your terminal
2. Run:
```bash
docker-compose up --build
```
3. The PostgreSQL database and dependencies for the FastAPI application will all be installed and setup for you, as well as starting the API.

# Choices & Reasoning
Docker:
  Docker greatly simplifies sharing applications and set-up across different machines. I used Docker-compose which allows me to run and manage multiple
  containers within one file.

PostgreSQL:
  I chose to use a relational database as an E-commerce platform would need an ACID compliant database. The choice for me was between PostgreSQL and MySQL,ultimately my choice to use PostgreSQL over MySQL was my familiarity with it, as well as the support provided by the community.

FastAPI:
  I decided to use FastAPI over a framework like Django as it's a lot more light-weight, especially for the task I was given. The API required a single
  endpoint. FastAPI is also much easier to use asynchronously than Django out of the box. This makes the API easier much simpler to scale in future.
  
SQLAlchemy:
  Using an ORM like SQLAlchemy provides some support against attacks such as SQL injections. SQLAlchemy is commonly used with FastAPI, and other frameworks, and is therefore well-documented, with a lot of community support.

Decisions:
  When I started, my first idea was to complete the first task as a standalone script, connecting to a PostgreSQL database using psycopg2 and populating the database with raw queries. I decided against that and thought about frameworks I could use. The reason for this is that the first two tasks are common tasks done in web development frameworks, so using a framework provides simplicity by abstracting some of the logic used to link the database and REST API.
  
  For the orders table, I added fields like order_status, order_date & delivery address. I believe these are necessary field for this application. Order_status takes three possible values, being cancelled, pending and fulfilled. 

# Application Flow
The sample data is a JSON file. Our main.py runs the seed_database() function in populate_tables.py before FastAPI begins accepting connections, and immediately after the database is created.

1. populate_tables.py:
  First establishes a connection to the database. Then we open the JSON file, load the data as a Python dictionary, and splits the customer and order data into their own distinct dictionaries.
  
  The populate_database() function connects to the database and executes two CREATE TABLE queries. The seed_database() function which is called in our main.py checks that the table is empty using the table_is_empty(Model) function and runs populate_database() if table_is_empty returns true.

2. API:
  The API is connected to the database through our database.py file. Which allows us to retrieve data through endpoints. the endpoint /orders/customer/<customer_id> will retrieve all orders for a given customer.

3. ETL Script
  This is a standalone script that establishes a connection to our database, and execute the following query:
  ```bash
  SELECT * FROM orders JOIN customers ON orders.customer_id=customers.id WHERE customers.status='ACTIVE';
```
The results of that query are returned to us in a dictionary like object called a RealDictRow, this comes from psycopg2 and can be used in the same
way as a standard Python dictionary. For each row in our results, I extract the data into a dictionary called new_data with the keys "order_id", "name" (first + last name) and "total_value" (quantity * unit price). Finally, we create a new file called transformed_data.csv and create a DictWriter from Pythons csv module. We use the keys from the first row of the new_data dictionary as the fieldnames for our csv file, and write each row (dictionary in new_data, which is a list of dictionaries) to our csv output file.
# What I would Improve/Change
  1. I create a products table, change the product_name field to product_id and use that as a foreign key.
  2. Would use ORM for ETL script.
  3. Spend more time on DB design
  4. I would also write tests, and spend more time testing the API, as well as handling edge cases witin my scripts, for example the ETL script and populate_tables script.
