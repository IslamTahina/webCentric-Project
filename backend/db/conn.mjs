import * as mysql from 'mysql'
var pool  = mysql.createPool({
  connectionLimit : 10,
  host: "localhost", 
  user: "root", 
  password: "mysql",
  database: "students",
});


export default pool;