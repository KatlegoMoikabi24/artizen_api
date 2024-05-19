'use strict'

const Artwork = use('App/Models/Artwork');
const Helpers = use('Helpers');

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
      console.error('Error updating artwork:', error.message);
      return response.status(500).json({ error: 'Failed to update artwork' });
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
      console.error('Error updating artwork:', error.message);
      return response.status(500).json({ error: 'Failed to update artwork' });
    }
  }

  async store({ request, response }) {
    try {
      const artworkData = request.only(['name', 'price']);

      const picture = request.file('picture', {
        types: ['image'],
        size: '2mb'
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
        artwork.picture = picturePath;
        
        await artwork.save();

      return response.json(artwork);

    } catch (error) {
      console.error('Error creating artwork:', error.message)
      return response.status(500).json({ error: 'Failed to create artwork' })
    }
  }
}

module.exports = ArtworkController
