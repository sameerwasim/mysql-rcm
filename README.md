# mysql-rcm
mysql-rcm (MySQL REST API Creator) is a package that enables you to quickly and easily create REST API endpoints for your application. This package is built on top of express and mysql2 and uses a configuration object as input to specify the details of your MySQL database and the tables for which you want to create REST endpoints.

## Configuration Object
The configuration object has two properties:

- `config`: an object that contains information about your MySQL database, such as the host, user, password, and database name.
- `tables`: an array of objects, where each object represents a table in your database and specifies the CRUD (Create, Read, Update, Delete) endpoints you want to create for it. Each table object also has a `middleware` property which allows you to specify custom middleware to run on specific endpoints. The middleware property has two properties:
  - `points`: an array of strings representing the endpoints for which the middleware should run.
  - `validator`: the custom middleware function.

## Usage
Here's an example of how you can use mysql-rcm in your application:

```javascript
mysql({
  config: {
    host: "host",
    user: "user",
    password: "pass",
    database: "database",
  },
  tables: [
    {
      name: "tablename",
      endpoints: ["GET", "POST", "PUT", "DELETE"],
      middleware: {
        points: ["PUT", "DELETE"],
        validator: middleware,
      },
    },
  ],
})
```
