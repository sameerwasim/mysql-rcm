const bodyToSQL = (body, db) => {
  const values = [];
  Object.keys(body).map((key, i) => {
    values.push(`\`${key.replace(/[\W_]+/g, " ")}\` = ${db.escape(body[key])}`);
  });

  return values;
};

exports.get = (req, res, _sql) => {
  _sql.db.query(`SELECT * FROM ${_sql.name}`, (err, result) => {
    if (err) res.status(401).send(err);
    else res.json(result);
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
  const id = req.params.id;
  _sql.db.query(`DELETE FROM ${_sql.name} WHERE id = ?`, id, (err, result) => {
    if (err) res.status(401).send(err);
    else res.json(result);
  });
};
