'use strict'

const Env = use('Env')

module.exports = {
  connection: Env.get('MAIL_CONNECTION', 'smtp'),

  smtp: {
    driver: 'smtp',
    pool: true,
    port: Env.get('MAIL_PORT', 2525),
    host: Env.get('MAIL_HOST', 'sandbox.smtp.mailtrap.io'),
    secure: false,
    auth: {
      user: Env.get('MAIL_USERNAME', '795d67b701909a'),
      pass: Env.get('MAIL_PASSWORD', '67b1c35e14725a'),
    },
    tls: {
      rejectUnauthorized: false,
    },
  },

  from: {
    address: Env.get('MAIL_FROM_ADDRESS', 'katlego1424@gmail.com'),
    name: Env.get('MAIL_FROM_NAME', 'Artizen App'),
  },
}
