const User = use('App/Models/User')
const Hash = use('Hash')

class AuthController {
  async login({ request, response }) {
    const { email, password } = request.only(['email', 'password']);
  
    try {
      const user = await User.findByOrFail('email', email);
      console.log('User found:', user);
  
      const passwordVerified = await Hash.verify(password, user.password);
      console.log('Password verified:', passwordVerified);
  
      if (!passwordVerified) {
        return response.status(400).json({ error: 'Invalid password' });
      }
  
      return response.ok({ data: { user } });
    } catch (error) {
      console.error('Error during login:', error);
      return response.status(400).json({ error: 'Invalid credentials' });
    }
  }
  

  async register({ request, response }) {
    const { 
      name,
      surname,
      role,
      email,
      contact,
      password
    } = request.only([ 'name', 'surname', 'role', 'email', 'contact', 'password'])

    const user = new User();
    user.name = name;
    user.surname = surname;
    user.role = role;
    user.username = email;
    user.email = email;
    user.password = password;
    user.contacts = contact;

    await user.save()

    return response.created(user)
  }
}

module.exports = AuthController
