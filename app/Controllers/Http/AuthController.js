const User = use('App/Models/User')
const Hash = use('Hash')

class AuthController {
  async login({ request, auth, response }) {
    const { email, password } = request.only(['email', 'password'])

    try {

      // Find the user by email
      const user = await User.findByOrFail('email', email)

      // Verify password
      const passwordVerified = await Hash.verify(password, user.password)
       if (!passwordVerified) {
         return response.status(400).json({ error: 'Invalid password' })
       }
 
      return response.ok({ data: { user }});
    } catch (error) {
      console.error('Error during login:', error)
      return response.status(400).json({ error: 'Invalid credentials' })
    }
  }

  async register({ request, response }) {
    const { email, password } = request.only(['email', 'password'])

    // Create a new user
    const user = new User()
    user.email = email
    user.password = password
    await user.save()

    return response.created(user)
  }
}

module.exports = AuthController
