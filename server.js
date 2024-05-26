const { Ignitor } = require('@adonisjs/ignitor');

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireHttpServer((handler) => {
    const Server = use('Server');
    const port = process.env.PORT || 10000;
    Server.getInstance().listen(port, '0.0.0.0', () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(console.error);
