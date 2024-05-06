const getConnection = require('../database.js');

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
      .catch((error) => {
        reject(error);
      });
  });
};


module.exports = executeQuery;
