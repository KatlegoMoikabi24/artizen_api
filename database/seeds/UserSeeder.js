'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const User = use('App/Models/User');
const Hash = use('Hash');

class UserSeeder {
  async run() {
    await User.create({
      name: 'Foward',
      surname: 'Nkuna',
      username: 'Foward1424',
      contacts: '0664301375',
      email: 'Foward0@gmail.com',
      role: 'admin',
      password: await Hash.make('123456')
    });
  }
}

module.exports = UserSeeder;
