
# NEW VERSION of Pembayaran SPP (School Tution) - Back-end

Another final project in my second third year. The same study case from my second year. But, this one have so much improvement for the basecode. 
## Environment Variables

This project didn't implement environment variables, cuz all the SECRET KEY already hardcoded in each file (usually at the top of the file). 

There is only a database config that available in the file config/config.js. 


## Deployment
Install the depedencies (sorry for this project pnpm not available yet)

```bash
  npm install
```

Then initiate your database in your local server. Name of the DB should match with the database name in file config.js. Now, you can run migration.
```bash
  pnpm sequelize db:migrate
```

Now you can run this with command

```bash
  pnpm start
```

PS: Watch out! There is nodemon in this programme
