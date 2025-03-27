// models/Property.js
const { pool } = require('../config/db');

const Property = {
  // Find all properties
  findAll: async () => {
    try {
      const [rows] = await pool.execute(`
        SELECT p.*, 
               u.name as owner_name,
               GROUP_CONCAT(pi.image_url) as images
        FROM properties p
        JOIN users u ON p.owner_id = u.id
        LEFT JOIN property_images pi ON p.id = pi.property_id
        GROUP BY p.id
        ORDER BY p.created_at DESC
      `);

      return rows.map(property => ({
        ...property,
        amenities: property.amenities ? JSON.parse(property.amenities) : [],
        images: property.images ? property.images.split(',') : []
      }));
    } catch (error) {
      console.error('Error finding all properties:', error);
      throw error;
    }
  },

  // Find property by ID
  findById: async (id) => {
    try {
      const [rows] = await pool.execute(`
        SELECT p.*, 
               u.name as owner_name, 
               u.email as owner_email,
               GROUP_CONCAT(pi.image_url) as images
        FROM properties p
        JOIN users u ON p.owner_id = u.id
        LEFT JOIN property_images pi ON p.id = pi.property_id
        WHERE p.id = ?
        GROUP BY p.id
      `, [id]);

      if (rows.length === 0) {
        return null;
      }

      const property = rows[0];
      return {
        ...property,
        amenities: property.amenities ? JSON.parse(property.amenities) : [],
        images: property.images ? property.images.split(',') : [],
        owner: {
          id: property.owner_id,
          name: property.owner_name,
          email: property.owner_email
        }
      };
    } catch (error) {
      console.error('Error finding property by ID:', error);
      throw error;
    }
  },

  // Find properties by owner ID
  findByOwner: async (ownerId) => {
    try {
      const [rows] = await pool.execute(`
        SELECT p.*, 
               GROUP_CONCAT(pi.image_url) as images
        FROM properties p
        LEFT JOIN property_images pi ON p.id = pi.property_id
        WHERE p.owner_id = ?
        GROUP BY p.id
        ORDER BY p.created_at DESC
      `, [ownerId]);

      return rows.map(property => ({
        ...property,
        amenities: property.amenities ? JSON.parse(property.amenities) : [],
        images: property.images ? property.images.split(',') : []
      }));
    } catch (error) {
      console.error('Error finding properties by owner:', error);
      throw error;
    }
  },

  // Create a new property
  create: async (propertyData) => {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Insert into properties table
      const [result] = await connection.execute(`
        INSERT INTO properties (
          title, 
          description, 
          property_type, 
          bedrooms, 
          bathrooms, 
          square_feet, 
          price, 
          address, 
          city, 
          state, 
          zip_code, 
          country, 
          amenities, 
          available_from, 
          available_to, 
          owner_id, 
          created_at, 
          updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      `, [
        propertyData.title,
        propertyData.description,
        propertyData.propertyType,
        propertyData.bedrooms,
        propertyData.bathrooms,
        propertyData.square_feet,
        propertyData.price,
        propertyData.address,
        propertyData.city,
        propertyData.state,
        propertyData.zip_code,
        propertyData.country,
        JSON.stringify(propertyData.amenities),
        propertyData.available_from,
        propertyData.available_to,
        propertyData.owner_id
      ]);
      
      const propertyId = result.insertId;
      
      // Insert images
      if (propertyData.images && propertyData.images.length > 0) {
        const imageValues = propertyData.images.map(image => [propertyId, image]);
        
        // Using a prepared statement with multiple values
        const placeholders = propertyData.images.map(() => '(?, ?)').join(', ');
        const imageParams = propertyData.images.flatMap(image => [propertyId, image]);
        
        await connection.execute(`
          INSERT INTO property_images (property_id, image_url) 
          VALUES ${placeholders}
        `, imageParams);
      }
      
      await connection.commit();
      
      // Return the created property with ID
      return {
        id: propertyId,
        ...propertyData
      };
    } catch (error) {
      await connection.rollback();
      console.error('Error creating property:', error);
      throw error;
    } finally {
      connection.release();
    }
  },

  // Update a property
  update: async (id, updateData) => {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Update properties table
      const [result] = await connection.execute(`
        UPDATE properties
        SET 
          title = COALESCE(?, title),
          description = COALESCE(?, description),
          property_type = COALESCE(?, property_type),
          bedrooms = COALESCE(?, bedrooms),
          bathrooms = COALESCE(?, bathrooms),
          square_feet = COALESCE(?, square_feet),
          price = COALESCE(?, price),
          address = COALESCE(?, address),
          city = COALESCE(?, city),
          state = COALESCE(?, state),
          zip_code = COALESCE(?, zip_code),
          country = COALESCE(?, country),
          amenities = COALESCE(?, amenities),
          available_from = COALESCE(?, available_from),
          available_to = COALESCE(?, available_to),
          updated_at = NOW()
        WHERE id = ?
      `, [
        updateData.title,
        updateData.description,
        updateData.propertyType,
        updateData.bedrooms,
        updateData.bathrooms,
        updateData.square_feet,
        updateData.price,
        updateData.address,
        updateData.city,
        updateData.state,
        updateData.zip_code,
        updateData.country,
        JSON.stringify(updateData.amenities),
        updateData.available_from,
        updateData.available_to,
        id
      ]);
      
      // Add new images if any
      if (updateData.newImages && updateData.newImages.length > 0) {
        const placeholders = updateData.newImages.map(() => '(?, ?)').join(', ');
        const imageParams = updateData.newImages.flatMap(image => [id, image]);
        
        await connection.execute(`
          INSERT INTO property_images (property_id, image_url) 
          VALUES ${placeholders}
        `, imageParams);
      }
      
      // Delete images if specified
      if (updateData.deleteImages && updateData.deleteImages.length > 0) {
        const placeholders = updateData.deleteImages.map(() => '?').join(', ');
        await connection.execute(`
          DELETE FROM property_images 
          WHERE property_id = ? AND image_url IN (${placeholders})
        `, [id, ...updateData.deleteImages]);
      }
      
      await connection.commit();
      
      // Get updated property
      return await Property.findById(id);
    } catch (error) {
      await connection.rollback();
      console.error('Error updating property:', error);
      throw error;
    } finally {
      connection.release();
    }
  },

  // Delete a property
  delete: async (id) => {
    const connection = await pool.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Get images to delete files
      const [images] = await connection.execute(
        'SELECT image_url FROM property_images WHERE property_id = ?',
        [id]
      );
      
      // Delete from property_images table
      await connection.execute(
        'DELETE FROM property_images WHERE property_id = ?',
        [id]
      );
      
      // Delete from properties table
      await connection.execute(
        'DELETE FROM properties WHERE id = ?',
        [id]
      );
      
      await connection.commit();
      
      // Return image paths for file deletion
      return images.map(img => img.image_url);
    } catch (error) {
      await connection.rollback();
      console.error('Error deleting property:', error);
      throw error;
    } finally {
      connection.release();
    }
  }
};

module.exports = Property;