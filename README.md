# mysql-rcm
mysql-rcm (MySQL REST API Creator) is a package for Node.js that enables you to quickly and easily create REST API endpoints for your application based on a MySQL database. This package is built on top of the express and mysql2 libraries, and uses a configuration object to specify the details of your MySQL database and the tables for which you want to create REST endpoints.

## Configuration Object
The configuration object has two properties:

- `config`: an object that contains the connection details for your MySQL database, including the host, user, password, and database name.
- `tables`: an array of objects, each representing a table in your database and specifying the CRUD (Create, Read, Update, Delete) endpoints you want to create. Each table object also has a middleware property, which allows you to specify custom middleware functions to run on specific endpoints. The middleware property has two properties:
  - `points`: an array of strings that represents the endpoints for which the custom middleware should be executed.
  - `validator`: the custom middleware function that should be executed.

## Usage
Here's an example of how you can use the mysql-rcm package in your application:

```javascript
const mysql = require('mysql-rcm')

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

## Endpoints
Here's a bit of detail about how to send request to those endpoints:

`POST`
```POST
Axios.post(`api/table_name`, { ...form_data })
```

`GET`
```GET
Axios.get(`api/table_name?filters={"id": "1"}&pagination=[0,10]`)
```

`PUT`
```PUT
Axios.put(`api/table_name/:id`, { ...form_data })
```

`DELETE`
```DELETE
Axios.delete(`api/table_name/:id`) # For Single Delete
Axios.delete(`api/table_name?id=1,2,3`) # For Mutli Delete
```

In the examples above, table_name should be replaced with the name of the specific table for which you want to generate endpoints. The filters and pagination query parameters are optional and allow you to filter and paginate the results of your GET requests.

## Contributing

The mysql-rcm package is open-source and welcomes contributions. If you have a significant change in mind, please open an issue first to discuss your proposed changes.

## Extra

`re-express`: If you're interested in a similar solution for MongoDB, you may want to check out the [re-express](https://www.npmjs.com/package/re-express).

## License

[MIT](https://choosealicense.com/licenses/mit/)
