import pool from "../db/conn.mjs";

function doQuery(query, callback) {
  pool.getConnection((err, connection) => {
    if (err) callback(err);

    connection.query(query, (error, results, fields) => {
      if (error) callback(error);
      callback(null, results, fields);
    });
  });
}

export default {
  getAllStudents(req, res) {
    doQuery("select * from students;", (err, results, fields) => {
      if (err) res.status(500).send("faild to do whatever");
      res.send(results);
    });
  },

  getStudent(req, res) {
    const id = req.params.id;
    doQuery(`select * from students where id = ${id};`, (err, results) => {
      if (err) res.status(500).send(err);

      res.send(results);
    });
  },

  addStudent(req, res) {
    const { firstName, lastName, age, city, email } = req.body;
    if ([firstName, lastName, age, city, email].includes(undefined)) {
      res.status(400).send("Bad Request");
    }

    doQuery(
      `INSERT INTO students 
          (firstName, lastName, id, age, city, email) 
             VALUES ('${firstName}', '${lastName}', NULL, ${age}, '${city}', '${email}')`,
      (err, results, fields) => {
        if (err) res.status(400).send(err.sqlMessage);

        res.send(results);
      }
    );
  },

  updateStudent(req, res) {
    // const { firstName, lastName, age, city, email } = req.body;
    const sets = Object.entries(req.body).map(([key, value]) => {
      if (typeof value == "string") value = `'${value}'`;
      return `${key} = ${value}`;
    });

    const id = req.params.id;

    let sql = "UPDATE students SET " + sets.join(", ") + ` where id = ${id};`;
    doQuery(sql, (err, results) => {
      if (err) res.status(400).send(err.sqlMessage);
      res.send(results);
    });
  },

  deleteStudent(req, res) {
    const id = req.params.id;

    doQuery(`delete  from students where id = ${id};`, (err, results) => {
      if (err) res.status(500).send(err);

      res.send(results);
    });
  },
};
