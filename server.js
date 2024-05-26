'use strict'

const { Ignitor } = require('@adonisjs/ignitor')

new Ignitor(require('@adonisjs/fold'))
  .appRoot(__dirname)
  .fireHttpServer((handler) => {
    const Env = use('Env')
    const Server = use('Server')
    Server.getInstance().listen(Env.get('PORT'), '0.0.0.0')
  })
  .catch(console.error)
