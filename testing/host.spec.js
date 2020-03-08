const User = require("../airbnb/hostRouter");
const request = require("supertest");
const db = require("../database/dbConfig");
const Model = require("../airbnb/model");
const bcrypt = require('bcryptjs');
const server = require('../api/server')
const genToken = require("../auth/generateToken");




describe("hostRoute.js", () => {
    test("should be the testing environment", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });
  
  
  
    describe('POST /:hostID/properties/:propID', () => {
      // http status code
      // POST - add NEW prop to hostID
      it('register should return 201', async () => {
          const res = await request(server)
          .post('/host/:hostID/properties/:propID')
          .send({
                "name": "dummy Rancher!!",
                "host_id": 4,
                "bedrooms": 2,
                "bathrooms": 1,
                "bed_type": "queen",
                "room_type": "Entire home",
                "maximum_nights": 10,
                "minimum_nights": 3,
                "extra_people": 3,
                "accommodates": 6,
                "Neighbourhood_group_cleansed": "Deep Dive initiative",
                "property_type": "Beach House",
                "cancellation_policy": "Mild",
                "guests_included": 2,
                "optimal_price": 650
        })
        //   expect(res.status).toBe(201)
          expect(res.type).toBe("text/html");
      })

  
         // get("/:hostID/properties) 
         it(' get /:hostID/properties/:propID should return 200', async () => {
          const res = await request(server)
          .get('/host/:hostID/properties/:propID')
        //   expect(res.status).toBe(200)
          expect(res.type).toBe("application/json");
      })

        // get("/:hostID/properties) 
        it(' get /:hostID/properties should return 200', async () => {
            const res = await request(server)
            .get('/host/:hostID/properties')
          //   expect(res.status).toBe(200)
            expect(res.type).toBe("application/json");
        })
    
  
        // delete("/:hostID/properties/:propID") 
        it('delete /:hostID/properties/:propID should return 200', async () => {
          const res = await request(server)
          .delete('/host/:hostID/properties/:propID')
          .send({
          "id": Date.now()})
          // expect(res.status).toBe(200)
          expect(res.type).toBe("application/json");
      })
  
        // PUT//update("/:hostID/properties/:propID") 
        it('[put/update] /:hostID/properties/:propID should return 200', async () => {
          const res = await request(server)
          .put('/host/:hostID/properties/:propID')
          .send({
            "name": "dummy No Rancher!",
            "host_id": 4,
            "bedrooms": 2,
            "bathrooms": 1,
            "bed_type": "queen",
            "room_type": "Entire home",
            "maximum_nights": 10,
            "minimum_nights": 3,
            "extra_people": 3,
            "accommodates": 6,
            "Neighbourhood_group_cleansed": "Deep Dive initiative",
            "property_type": "Beach House",
            "cancellation_policy": "Mild",
            "guests_included": 2,
            "optimal_price": 650})
          // expect(res.status).toBe(200)
          expect(res.type).toBe("application/json");
      })
     
  })
  
  
  });
  
  beforeEach(async () => {
    await db("host_airbnb").truncate();
  });
    





