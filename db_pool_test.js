const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "doc_management",
  password: "NewPassword",
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Get a connection from the pool
const getConnection = () => {
  return new Promise((resolve, reject) => {
    pool
      .connect()
      .then((client) => {
        console.log("Connected to database.");
        resolve(client);
      })
      .catch((reason) => {
        console.error("Failed to connect database:", reason);
        reject(reason);
      });
  });
};

const executeQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    getConnection()
      .then((client) => {
        client.query("BEGIN", (err) => {
            if(err){
              client.release();
              reject(err);
            } else {
              client.query(query, params, (error, rows) => {
                if(error){
                  client.query('ROLLBACK', () =>{
                    client.release();
                    reject(error);
                  });
                }else {
                  client.query("COMMIT", (err) => {
                    if(err){
                      client.query('ROLLBACK', () =>{
                        client.release();
                        reject(error);
                      });  
                    }else{
                      client.release();
                      resolve(rows?.rows);
                    }
                  });
                }
              });
            }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
};





executeQuery("select count(*) from abc;", []).then((rows) => {
  console.log(rows);
}).catch((err) => {
  console.log("Error man!");
  console.log(err);
});

