const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "nextjsdev",
    password: "nextjs123##",
    database: "fullstacknextjs",
  },
});

export default knex;
