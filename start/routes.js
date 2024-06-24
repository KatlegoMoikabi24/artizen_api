'use strict'

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route');

Route.group(() => {

    Route.post('login', 'AuthController.login')
    Route.post('register', 'AuthController.register')

}).prefix('api/v1/auth/');

Route.group(() => {

    Route.get('', 'UserController.index'),
    Route.get(':id', 'UserController.findById'),
    Route.post(':id', 'UserController.update'),
    Route.post('role/:id', 'UserController.updateRole')
}).prefix('api/v1/users/');

Route.group(() => {

    Route.get('', 'ArtworkController.index')
    Route.delete(':id', 'ArtworkController.delete')
    Route.post('', 'ArtworkController.store')

    Route.get(':id', 'ArtworkController.findById')
    Route.get('pending', 'ArtworkController.pending')
    Route.put('approve/:id', 'ArtworkController.approve')
    Route.put('reject/:id', 'ArtworkController.reject')

    Route.post('pre-buy/:id', 'ArtworkController.finalStage')
    Route.post('update/:id', 'ArtworkController.update')
    Route.get('artist/:id', 'ArtworkController.findByArtistId')
    Route.get('admin/:id', 'ArtworkController.findByAdminId')

    Route.get('owner/:id', 'ArtworkController.findByOwnerId')
    Route.put('buy/:id', 'ArtworkController.buy')
    Route.get('image/:fileName', 'ArtworkController.image')
    Route.put('reloadBid/:id', 'ArtworkController.updateBidTimer')

}).prefix('api/v1/artwork/');

Route.group(() => {

    Route.post('', 'PaymentController.add')
    Route.get('', 'PaymentController.index')

    Route.put(':id', 'PaymentController.update')
    Route.get(':id', 'PaymentController.findById')
    Route.get('user/:id', 'PaymentController.findByUserId')

}).prefix('api/v1/payments/');