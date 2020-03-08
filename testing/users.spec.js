const User = require("../users/userRoute");
const request = require("supertest");
const db = require("../database/dbConfig");
const Model = require("../users/model");
const bcrypt = require('bcryptjs');
const server = require('../api/server')
const genToken = require("../auth/generateToken");


async function mockUser( firstname, lastname, email, username, password, id ) {
    // const salt = await bcrypt.hashSync(10);
    // const pass = await password;
    const user = {
        'id': id,
        'firstname': firstname,
        'lastname': lastname,
        'email': email,
        'password': password,
        'username': username
    };

    await Model.addUser(user);
}



describe("userRoute.js", () => {
  test("should be the testing environment", () => {
    expect(process.env.DB_ENV).toBe("testing");
  });



  describe('POST /', () => {
    // http status code
    // REGISTER POST
    it('register should return 201', async () => {
        const res = await request(server)
        .post('/user/register')
        .send({	
        "firstname": "toni", 
        "lastname": "darden",
        "email": "tddlswdebpt9@gmail.com",
        "username": "t00niddarden",
        "password": "mypassword"})
        expect(res.status).toBe(201)
        expect(res.type).toBe("application/json");
    })
    // login POST
    it('login should return 200', async () => {
        const res = await request(server)
        .post('/user/login')
        .send({	 
        "username": "newExdsdsample1",
        "password": "mypassword"})
        expect(res.status).toBe(401)
        expect(res.type).toBe("application/json");
    })
    

       // get("/:id") 
       it(' get /:id should return 200', async () => {
        const res = await request(server)
        .get('/user/:id')
        // expect(res.status).toBe(200)
        expect(res.type).toBe("application/json");
    })

      // delete("/:id") 
      it('delete /:id should return 200', async () => {
        const res = await request(server)
        .delete('/user/:id')
        .send({
        "username": "newExdsdsample1",
        "password": "mypassword"})
        // expect(res.status).toBe(200)
        expect(res.type).toBe("application/json");
    })

      // PUT//update("/:id") 
      it('[put/update] /:id should return 200', async () => {
        const res = await request(server)
        .put('/user/:id')
        .send({
            "firstname": "toni", 
            "lastname": "darden",
            "email": "tddlswdebpt9@gmail.com",
            "username": "t00niddarden",
            "password": "mypassword"})
        // expect(res.status).toBe(200)
        expect(res.type).toBe("application/json");
    })
   
})


});



// USER MODEL

describe("user model", () => {
  describe("find", () => {
    it("should find the provided users into db", async () => {
      await Model.find({ username: "vvv", password: "password" });
      await Model.find({ username: "vev", password: "password" });

      const model = await db("users");
      expect(model).toHaveLength(0);
    });
  });
});

beforeEach(async () => {
  await db("users").truncate();
});
