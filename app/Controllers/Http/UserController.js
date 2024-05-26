'use strict'

const User = use('App/Models/User');

class UserController {
    async index({ response }) {
        try {
          // Fetch all users from the database
          const users = await User.all()
    
          return response.json(users)
        } catch (error) {
          // Handle errors
          console.error('Error fetching users:', error.message)
          return response.status(500).json({ error: 'Failed to fetch users' })
        }
      }

      async findById({ params, response }) {
        try {

          const user = await User.find(params.id)
    
          if (!user) {
            return response.status(404).json({ error: 'User not found' })
          }

          console.log('user: ', user);
    
          return response.json(user)
        } catch (error) {
          // Handle errors
          console.error('Error fetching user by ID:', error.message)
          return response.status(500).json({ error: 'Failed to fetch user' })
        }
      }

      async update({ params, request, response }) {
        try {
          const user = await User.find(params.id)
    
          if (!user) {
            return response.status(404).json({ error: 'User not found' })
          }
    
          user.merge(request.only(['name', 'email', 'password']))
    
          await user.save()
    
          return response.json(user)
        } catch (error) {
          console.error('Error updating user:', error.message);
          return response.status(500).json({ error: 'Failed to update user' });
        }
      }

      async updateRole({ request, response }) {
        try {

          console.log( request.input(['userId']));
          const user_id = request.input(['userId']);
          const user = await User.find(user_id);
    
          if (!user) {
            return response.status(404).json({ error: 'User not found' });
          }
    
          user.role = request.input(['role']);
    
          await user.save();
    
          return response.json(user);
        } catch (error) {
          console.error('Error updating user:', error.message);
          return response.status(500).json({ error: 'Failed to update user' });
        }
      }
}

module.exports = UserController
