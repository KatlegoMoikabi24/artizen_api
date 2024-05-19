

HttpContextContract
const User = require('App/Models/User')


class AuthController {
  async login({ request, auth, response, session }) {
    const { email, password } = request.all()

    try {
      await auth.attempt(email, password)
      return response.redirect('/dashboard')
    } catch {
      session.flash({ error: 'Invalid credentials' })
      return response.redirect('back')
    }
  }

  async logout({ auth, response }) {
    await auth.logout()
    return response.redirect('/')
  }
}

module.exports = AuthController
