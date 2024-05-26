const { Ignitor } = require('@adonisjs/ignitor');

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireHttpServer((handler) => {
    const Server = use('Server');
    Server.getInstance().listen(process.env.PORT, '0.0.0.0');
  })
  .catch(console.error);
