import client from "./db_connect";
export const createtable = () =>{
    client.query(`
      CREATE TABLE IF NOT EXISTS users(
      id serial PRIMARY KEY,
      email varchar(30)  NOT NULL UNIQUE,firstname varchar(25)  NOT NULL,
      lastname varchar(25)  NOT NULL,password varchar(10000)  NOT NULL,
      type varchar(10)  NOT NULL,isadmin boolean NOT NULL);`
   ); 
}

 export const truncatetable = () =>{
    client.query('TRUNCATE TABLE users CASCADE'); 
}
