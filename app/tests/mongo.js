process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')

const { Qwerty } = require('../db/mongoose')

const server = require('../index')
const should = chai.should()


chai.use(chaiHttp)

describe('Qwerties', () => {
  // beforeEach((done) => { 
  //   Qwerty.remove({}, (err) => { 
  //     done()           
  //   })        
  // })
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      [1, 2, 3].indexOf(5).should.equal(-1);
      [1, 2, 3].indexOf(0).should.equal(-1);
    });
    it('should return element index > -1 when the value is present', function() {
      [1, 2, 3].indexOf(2).should.equal(1);
    });
  });

  describe('#for testing()', function() {
    const arr = [1,2,3,4,5,6,7,8,9]
    for (let i = 0; i < arr.length; i++) {
      it(`should return true if index and element are equal for ${arr[i]}`, function() {
        (i + 1).should.equal(arr[i]);
      });
    }
  });
  /*
  * Test the /GET route
  */
  describe('/GET qwerties', () => {
    Qwerty.remove({}, (err) => {})
    it('it should GET all the qwerties', (done) => {
      chai.request(server)
        .get('/mongo/get')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.body.length.should.be.eql(0)
          done()
        })
    })
  })

  /*
  * Test the /POST route
  */
 describe('/POST qwerty', () => {
  it('it should not POST a qwerty without pages field', (done) => {
    const qwerty = {
      title: 'The Lord of the Rings',
      author: 'J.R.R. Tolkien', 
      year: 1954
    }
    chai.request(server)
      .post('/mongo/create')
      .send(qwerty)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.body.should.have.property('title')
        done()
      })
   })
   it('it should GET all the qwerties', (done) => {
    chai.request(server)
      .get('/mongo/get')
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        res.body.length.should.be.eql(1)
        done()
      })
    })
  })
  /*
  * Test the /GET one route
  */
 describe('/GET/:id qwerty', () => {
    it('it should GET a qwerty by the given id', (done) => {
      const qwerty = new Qwerty({
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien', 
        comment: `One Ring to rule them all, 
        One Ring to find them,
        One Ring to bring them all and in the darkness bind them
        In the Land of Mordor where the Shadows lie.`, 
        year: 1954, 
        pages: 1170 
      })
      qwerty.save((err, qwerty) => {
        chai.request(server)
          .get('/mongo/get-one/' + qwerty.id)
          .send(qwerty)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('object')
            res.body.should.have.property('title')
            res.body.should.have.property('author')
            res.body.should.have.property('pages')
            res.body.should.have.property('year')
            res.body.should.have.property('_id').eql(qwerty.id)
            done()
        })
      })
    })
  })
  after(() => {
    Qwerty.remove({}, (err) => {})
  })
})