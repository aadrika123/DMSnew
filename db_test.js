const { Client } = require('pg')

const fun = async () => {
    console.log("creating conneciton!");
    const client = new Client({
      user: 'postgres',
      host: 'localhost',
      database: 'doc_management',
      password: 'NewPassword',
      port: 5432,
    })
    client.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
  console.log("connection closed!");
};

fun().then(()=>{
    console.log("Program finished!");
});
