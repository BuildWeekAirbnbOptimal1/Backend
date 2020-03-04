const router = require('express').Router();

const vRoute = require('../middleware/verifiedRoutes');
const vToken = require('../middleware/verifiedToken');

const Properties = require('./model');


// GET
router.get('/:hostID/properties', vToken, async (req, res) => {
    
    const { hostID } = req.params;
    try {
            // user getProps by passing in the hostID and only returning what belongs to this user
      const userData = await Properties.getProps(hostID);
  
      if (!userData[0]) {
        res.status(200).json({ message: 'There are no properties saved in database' });
      }
  
      res.status(200).json({ user_properties: userData });
    } catch (err) {

      console.log(err);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });

// GET 

router.get('/:hostID/properties/:propID',vToken, async (req, res) => {
    
    const { hostID, propID } = req.params;

    try {
      // pass in the hostID and property ID to get that specific property, as long as it belong to the user
      const userData = await Properties.getUniqueProp(hostID, propID);

      if (!userData) {
        res.status(200).json({ message: 'That property does not exist' });
      }

      res.status(200).json(userData);
    } catch (err) {

      console.log(err);
      res.status(500).json({ message: 'Server Error' });
    }
  }
);

// POST - add NEW prop to hostID

router.post('/:hostID/properties', vToken, async (req, res) => {
    const {hostID} = req.params;
    const {body} = req;

    const {
      id,
      name,
      bedrooms,
      bathrooms,
      bed_type,
      room_type,
      maximum_nights,
      minimum_nights,
      extra_people,
      accommodates,
      Neighbourhood_group_cleansed,
      property_type,
      cancellation_policy,
      guests_included,
      optimal_price
    } = body;

    if (
        !id,
        !name,
        !bedrooms,
        !bathrooms,
        !bed_type,
        !room_type,
        !maximum_nights,
        !minimum_nights,
        !extra_people,
        !accommodates,
        !Neighbourhood_group_cleansed,
        !property_type,
        !cancellation_policy,
        !guests_included,
        !optimal_price
    ) {
        res.status(400).json({message: 'Must enter all required fields'})
    }

    const hostProperty = new Object({...body, host_id: hostID})
    
    try{
        const userData = await Properties.addProp(hostProperty);
        res.status(201).json({message: 'Property uploaded successfully', hostProperty: userData[0]}) //reset host table
    }catch(error){
        console.log(error)
        res.status(500).json({message: 'internal server error'})
    }

})


// UPDATE UserID prop 

router.put('/:hostID/properties/:propID',vToken, async (req, res) => {
    
      const { hostID, propID } = req.params;
      const { body } = req;
  
      const hostProperty = new Object({ ...body, host_id: hostID });
  
      try {

        const userData = await Properties.updateProp(
          hostID,
          propID,
          hostProperty
        );
  
        if (!userData[0]) {
          res.status(404).json({ message: 'Property does not exist' });
        }
  
        res.status(201).json({
          message: 'Property has been updated',
          hostProperty: userData[0]
        });
      } catch (error) {

        console.log(error);
        res.status(500).json({ message: 'Server Error' });
      }
    }
  );

  // DELETE UserID prop 

  router.delete('/:hostID/properties/:propID',vToken, async (req, res) => {

      const { hostID, propID } = req.params;
  
      try {
        let userData = await Properties.removeProp(hostID, propID);
  
        if (userData == 0) {
          res.status(404).json({ message: 'Property was not found' });
        }
  
        res.status(200).json({
          message: 'Property has been successfully deleted'
        });
      } catch (error) {

        console.log(error);
        res.status(500).json({ message: 'Interal Server Error' });
      }
    }
  );







module.exports = router;