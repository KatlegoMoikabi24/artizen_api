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

class UserSeeder {
  async run () {
    await User.create({
      name: 'Katlego',
      surname: 'Moikabi',
      username: 'katlego1424',
      contacts: '0664301975',
      email: 'katlego@gmail.com',
      role: 'admin',
      password: '123456'
    });
  }
}

module.exports = UserSeeder;
