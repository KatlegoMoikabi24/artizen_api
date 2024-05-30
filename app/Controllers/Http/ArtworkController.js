'use strict'

const Artwork = use('App/Models/Artwork');
const Payment = use('App/Models/Payment');
const User = use('App/Models/User');
const Helpers = use('Helpers');
const path = require('path');
const fs = require('fs');

class ArtworkController {
  async index ({ response }) {
    try {
      const artworks = await Artwork.all()

      return response.json(artworks)
    } catch (error) {
      console.error('Error fetching artworks:', error.message)
      return response.status(500).json({ error: 'Failed to fetch artworks' })
    }
  }

  async findById({ params, response }) {
    try {

      const artwork = await Artwork.find(params.id)

      if (!artwork) {
        return response.status(404).json({ error: 'Artwork not found' })
      }

      console.log('artwork: ', artwork);

      return response.json(artwork)
    } catch (error) {
      // Handle errors
      console.error('Error fetching artwork by ID:', error.message)
      return response.status(500).json({ error: 'Failed to fetch artwork' })
    }
  }
  async findByArtistId({ params, response }) {
    try {
        const artistId = params.id;

        const artworks = await Artwork.query().where('artist_id', artistId).fetch();
        const user = await User.query().where('id', artistId).first();

        if (artworks.rows.length === 0) {
          return response.status(404).json({ error: 'No artworks found for the given artist ID' });
        }

        const result = {
          artworks: artworks.toJSON(),
          user: user ? user.toJSON() : null
        };
    
        return response.json(result);
    } catch (error) {
       console.error('Error fetching artwork by artist ID:', error.message)
      return response.status(500).json({ error: 'Failed to fetch artwork' })
    }
  }

  async findByAdminId({ params, response }) {
    try {
        const adminId = params.id;

        const artworks = await Artwork.query().where('approved_by', adminId).fetch();
    
        if (artworks.rows.length === 0) {
          return response.status(404).json({ error: 'No artworks found for the given Admin ID' });
        }
    
        return response.json(artworks);
    } catch (error) {
       console.error('Error fetching artwork by admin ID:', error.message)
      return response.status(500).json({ error: 'Failed to fetch artwork' })
    }
  }

  async findByOwnerId({ params, response }) {
    try {
        const ownerId = params.id;

        const artworks = await Artwork.query().where('bought_by', ownerId).fetch();
    
        if (artworks.rows.length === 0) {
          return response.status(404).json({ error: 'No artworks found for the given owner ID' });
        }
    
        return response.json(artworks);
    } catch (error) {
       console.error('Error fetching artwork by owner ID:', error.message)
      return response.status(500).json({ error: 'Failed to fetch artwork' })
    }
  }

  async approve({ params, response }) {
    try {
      const artwork = await Artwork.find(params.id);

      if (!artwork) {
        return response.status(404).json({ error: 'Artwork not found' });
      }

      artwork.status = 'approved';

      await artwork.save();

      return response.json({ message: 'Artwork approved successfully' });
    } catch (error) {
      console.error('Error approving artwork:', error.message);
      return response.status(500).json({ error: 'Failed to approving artwork' });
    }
  }

  async reject({ params, response }) {
    try {
      const artwork = await Artwork.find(params.id);

      if (!artwork) {
        return response.status(404).json({ error: 'Artwork not found' });
      }

      artwork.status = 'rejected';

      await artwork.save();

      return response.json(artwork);
    } catch (error) {
      console.error('Error rejecting artwork:', error.message);
      return response.status(500).json({ error: 'Failed to rejecting artwork' });
    }
  }


  async buy({ params, request,  response }) {
    try {
      const artwork = await Artwork.find(params.id);
      const payment = new Payment();

      const  belongsTo  = request.input(['bought_by']);

      if (!artwork) {
        return response.status(404).json({ error: 'Artwork not found' });
      }else if(!belongsTo){
        return response.status(500).json({ error: 'Buyer ID not found' });
      }

      payment.price = artwork.price;
      payment.artist_id = artwork.id;
      payment.user_id = belongsTo;
      
      artwork.status = 'sold';
      artwork.bought_by = belongsTo;

      await artwork.save();
      await payment.save();

      return response.json({ message: 'Artwork purchased successfully' });
    } catch (error) {
      console.error('Error rejecting artwork:', error.message);
      return response.status(500).json({ error: 'Failed to purchased artwork' });
    }
  }

  async store({ request, response }) {
    try {
      const artworkData = request.only(['name', 'price', 'artist_id']);

      const picture = request.file('picture', {
        types: ['image'],
        size: '5mb'
      })

      await picture.move(Helpers.publicPath('uploads/artworks'), {
        name: `${new Date().getTime()}.${picture.extname}`
      })

      if (!picture.moved()) {
        return picture.error();
      }

      artworkData.picture = picture.fileName;

       const picturePath = picture.fileName;
       const artwork = new Artwork();

        artwork.name = request.input('name');
        artwork.price = request.input('price');
        artwork.artist_id = request.input('artist_id');
        artwork.picture = picturePath;
        
        await artwork.save();

      return response.json(artwork);

    } catch (error) {
      console.error('Error creating artwork:', error.message)
      return response.status(500).json({ error: 'Failed to create artwork' })
    }
  }
  async image({ params, response }) {
    try {

      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
      response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');  

     const filePath = path.join(Helpers.publicPath('uploads/artworks'), params.fileName)

      if (fs.existsSync(filePath)) {
        return response.download(filePath)
      } else {
        return response.status(404).json({ error: 'Image not found' })
      }
    } catch (error) {
      console.error('Error retrieving image:', error.message)
      return response.status(500).json({ error: 'Failed to retrieve image'})
    }
  }
}

module.exports = ArtworkController
