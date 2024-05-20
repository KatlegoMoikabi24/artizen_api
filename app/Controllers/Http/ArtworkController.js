'use strict'

const Artwork = use('App/Models/Artwork');
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

  async approve({ params, response }) {
    try {
      const artwork = await artwork.find(params.id);

      if (!artwork) {
        return response.status(404).json({ error: 'Artwork not found' });
      }

      artwork.status = artwork.status === 'approved';

      await artwork.save();

      return response.json(artwork);
    } catch (error) {
      console.error('Error approving artwork:', error.message);
      return response.status(500).json({ error: 'Failed to approving artwork' });
    }
  }

  async reject({ params, response }) {
    try {
      const artwork = await artwork.find(params.id);

      if (!artwork) {
        return response.status(404).json({ error: 'Artwork not found' });
      }

      artwork.status = artwork.status === 'rejected';

      await artwork.save();

      return response.json(artwork);
    } catch (error) {
      console.error('Error rejecting artwork:', error.message);
      return response.status(500).json({ error: 'Failed to rejecting artwork' });
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
