const bodyToSQL = (body, db) => {
  const values = [];
  Object.keys(body).map((key, i) => {
    if (body[key]) values.push(`\`${key.replace(/[\W_]+/g, " ")}\` = ${db.escape(body[key])}`);
  });

  return values;
};

exports.get = (req, res, _sql) => {
  var { filters, pagination } = req.query;
  if (filters) {
    try {
      filters = bodyToSQL(JSON.parse(filters), _sql.db);
    } catch (err) {
      res.status(401).send("Error while parsing filters query");
    }
  }

  if (pagination) {
    pagination = JSON.parse(pagination);
  }

  _sql.db.query(`SELECT * FROM ${_sql.name} ${filters ? `WHERE ${filters.join(" AND ")}` : ""} ${pagination ? `LIMIT ${pagination[0]}, ${pagination[1]}` : ""}`, (err, result) => {
    if (err) res.status(401).send(err);
    else {
      _sql.db.query(`SELECT count(*) as total FROM ${_sql.name} ${filters ? `WHERE ${filters.join(" AND ")}` : ""}`, (err, total) => {
        if (err) res.status(401).send(err);
        else res.json({ data: result, total: total?.[0]?.total || 0 });
      });
    }
  });
};

exports.post = (req, res, _sql) => {
  const values = bodyToSQL(req.body, _sql.db);

  _sql.db.query(`INSERT INTO ${_sql.name} SET ${values}`, (err, result) => {
    if (err) res.status(401).send(err);
    else res.json(result);
  });
};

exports.put = (req, res, _sql) => {
  const id = req.params.id;
  const values = bodyToSQL(req.body, _sql.db);

  _sql.db.query(`UPDATE ${_sql.name} SET ${values} WHERE id = ?`, id, (err, result) => {
    if (err) res.status(401).send(err);
    else res.json(result);
  });
};

exports.delete = (req, res, _sql) => {
  try {
    if (req.params && req.params.id) {
      const id = req.params?.id || 0;
      _sql.db.query(`DELETE FROM ${_sql.name} WHERE id = ?`, id, (err, result) => {
        if (err) res.status(401).send(err);
        else res.json(result);
      });
    } else {
      let id = req.query?.id.split(",") || [];
      id = id.map((item) => _sql.db.escape(item));
      _sql.db.query(`DELETE FROM ${_sql.name} WHERE id IN (${id})`, (err, result) => {
        if (err) res.status(401).send(err);
        else res.json(result);
      });
    }
  } catch (err) {
    res.status(401).send("Error while deleting");
  }
};
