'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {
    Route.post('login', 'AuthController.login')
    Route.post('register', 'AuthController.register')
  }).prefix('api/v1/auth/')

Route.group(() => {
    Route.get('', 'UserController.index'),
    Route.get(':id', 'UserController.findById'), 
    Route.put(':id', 'UserController.update'),
    Route.put('activation/:id', 'UserController.activation')
}).prefix('api/v1/users/');

Route.group(() => {
    Route.get('', 'ArtworkController.index'),
    Route.post('', 'ArtworkController.store'),
    Route.get(':id', 'ArtworkController.findById'),
    Route.put('approve/:id', 'ArtworkController.approve'),
    Route.put('reject/:id', 'ArtworkController.reject'),
    Route.put('update/:id', 'ArtworkController.update'),
    Route.put('buy/:id', 'ArtworkController.buy'),
    Route.get('image/:fileName', 'ArtworkController.image')
}).prefix('api/v1/artwork/');

Route.group(() => {
    Route.post('', 'PaymentController.add'),
    Route.get('', 'PaymentController.index'),
    Route.put(':id', 'PaymentController.update'),
    Route.get(':id', 'PaymentController.findById')
}).prefix('api/v1/payments/');