const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const mongoose = require('mongoose'); //mongo connection
const bodyParser = require('body-parser'); //parses information from POST

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

router.route('/books')
  .get(function (req, res, next) {
    mongoose.model('Books').find({}, function (err, books) {
      if (err) {
        return console.error(err);
      }
      else {
        var userRating = userAvgRating(err, books);
        res.json({
          name: 'Books List',
          booksData: books,
          userRating: userRating
        });
      }
    });

    function userAvgRating(err, book) {
      var ratings = [];
      for (var i = 0; i < book.length; i++) {
        if (book[i]['reviews'] != "") {
          var reviews = book[i]['reviews'];
          var userRating = 0;
          for (var j = 0; j < reviews.length; j++) {
            userRating = userRating + parseInt(reviews[j]['rating']);
          }
          userRating = (userRating / parseInt(book[i]['reviews'].length));
          ratings.push(userRating);
        }
        else {
          ratings.push("No Reviews");
        }

      }
      return ratings;
    }
  })

router.route('/addBook')
  .get(function (req, res, next) {
    mongoose.model('Books').find({}, function (err, books) {
      if (err) {
        return console.error(err);
      }
      else {
        res.json({
          name: 'Books List',
          booksData: books
        })
      }
    });
  })
  .post(function (req, res) {
    var title = req.body.title;
    var author = req.body.author;
    var isbn = req.body.isbn;
    var price = req.body.price;

    mongoose.model('Books').create({
      title: title,
      author: author,
      isbn: isbn,
      price: price
    }, function (err, book) {
      if (err) {
        res.send("There was an error when adding the information to the database!");
      }
      else {
        book.save(function (err) {
          if (!err) {
            console.log("Record Added");
            res.send(book);

          } else {
            res.send("There was an error when adding the patient information to the database!");
          }
        });
      }
    })
  })

router.route('/addreviews/:id')
  .get(function (req, res, next) {
    var booksData;
    mongoose.model('Books').find({}, function (err, books) {
      if (err) {
        return console.error(err);
      }
      else {
        res.json({
          name: 'Books Reviews'
        })
      }
    });
  })
  .post(function (req, res) {
    var bookid = req.params.id;
    var name = req.body.name;
    var comment = req.body.comment;
    var rating = req.body.rating;
    console.log(req.body);

    mongoose.model('Books').findById(req.params.id, function (err, book) {
      if (err) {
        res.status = 200
        res.format({
          json: function () {
            res.json({ "Message": "Book not found" });
          }
        })
      }
      else {
        book.reviews.push({ reviewername: name, comment: comment, rating: rating });

        //var userRating = 0;
        //for (var i=0; i<book.reviews.length;i++)
        //{
        //userRating = userRating + parseInt(book.reviews[i].rating);
        //}
        //userRating = (userRating/parseInt(book.reviews.length));
        //book.avgrating = userRating;
        //console.log("Avg Rating" + userRating);
        book.save(function (err) {
          if (!err) {
            res.send("Reviews Count" + book.reviews.length);
          } else {
            res.send("There was an error when adding the patient information to the database!");
          }
        });
      }
    })
  });

router.route('/viewreviews/:id')
  // GET /doctors
  .get(function (req, res, next) {
    mongoose.model('Books').findById(req.params.id, function (err, book) {
      if (err) {
        return console.error(err);
      }
      else {
        res.json({
          id: req.params.id,
          title: book.title,
          reviews: book.reviews
        })
      }
    });
  })

router.route('/delete/:id')
  .get(function (req, res) {
    mongoose.model('Books').findById(req.params.id, function (err, book) {
      console.log("Get Method called");
      if (err) {
        res.status = 200
        res.format({
          json: function () {
            res.json({ "Message": "Book not found" });
          }
        })
      }
      else {
        res.format({
          json: function () {
            res.json(book);
          }
        })
      }
    })
  })
  .post(function (req, res) {
    mongoose.model('Books').findById(req.params.id, function (err, book) {
      console.log("Delete Method called");
      if (err) {
        res.status = 200
        res.format({
          json: function () {
            res.json({ "Message": "Book not found" });
          }
        })
      }
      else {
        book.remove(function (err, book) {
          if (err) {
            res.status = 200
            res.format({
              json: function () {
                res.json({ "Message": "Error removing book" });
              }
            })
          }
          else {
            res.json({ "Message": "book deleted" })
          }
        })
      }
    })
  });

router.route('/updateBook/:id')
  .get(function (req, res, next) {
    mongoose.model('Books').findById(req.params.id, function (err, book) {
      if (err) {
        return console.error(err);
      }
      else {
        console.log("Get Data" + book);
        res.json({
          flag: 'update',
          id: req.params.id,
          title: book.title,
          author: book.author,
          isbn: book.isbn,
          price: book.price
        })
      }
    });
  })
  .put(function (req, res) {
    var title = req.body.title;
    var author = req.body.author;
    var isbn = req.body.isbn;
    var price = req.body.price;
    console.log("Request Params Data" + req.params.id);
    mongoose.model('Books').findById(req.params.id, function (err, book) {
      if (err) {
        res.status = 200
        res.format({
          json: function () {
            res.json({ "Message": "Book not found" });
          }
        })
      }
      else {
        book.title = title;
        book.author = author;
        book.isbn = isbn;
        book.price = price;

        book.save(function (err) {
          if (err) {
            res.send("There was an error when adding the information to the database!");
          }
          else {
            res.json({ response: "Updated Sucessfully" });
          }
        })
      }
    })
  })

router.route('/search')
  .get(function (req, res, next) {
    mongoose.model('Books').find({}).sort('price').exec(function (err, books) {
      if (err) {
        return console.error(err);
      }
      else {
        res.json({
          booksData: books
        })
      }
    });
  })
  .post(function (req, res) {
    var searchQuery = req.body.searchText;
    var searchCriteria = req.body.searchCriteria;
    if (searchCriteria == 'title') {
      mongoose.model('Books').find({ 'title': searchQuery }, function (err, book) {
        searchResults(book, err);
      });
    }
    else if (searchCriteria == 'author') {
      mongoose.model('Books').find({ 'author': searchQuery }, function (err, book) {
        searchResults(book, err);
      });
    }
    else if (searchCriteria == 'isbn') {
      mongoose.model('Books').find({ 'isbn': searchQuery }, function (err, book) {
        searchResults(book, err);
      });
    }
    else if (searchCriteria == 'price') {
      mongoose.model('Books').find({ 'price': searchQuery }, function (err, book) {
        searchResults(book, err);
      });
    }
    else if (searchCriteria == 'avgrating') {
      mongoose.model('Books').find('reviews', function (err, book) {
        searchByRating(err, book)
      });
    }

    function searchByRating(err, book) {
      for (var i = 0; i < book.length; i++) {
        if (book[i]['reviews'] != "") {
          var reviews = book[i]['reviews'];
          var userRating = 0;
          for (var j = 0; j < reviews.length; j++) {
            userRating = userRating + parseInt(reviews[j]['rating']);
          }
          userRating = (userRating / parseInt(book[i]['reviews'].length));
          searchResults(book[i], err);
        }
      }
    }

    function userAvgRating(err, book) {
      var ratings = [];
      for (var i = 0; i < book.length; i++) {
        if (book[i]['reviews'] != "") {
          var reviews = book[i]['reviews'];
          var userRating = 0;
          for (var j = 0; j < reviews.length; j++) {
            userRating = userRating + parseInt(reviews[j]['rating']);
          }
          userRating = (userRating / parseInt(book[i]['reviews'].length));
          ratings.push(userRating);
        }
        else {
          ratings.push("No Reviews");
        }

      }
      return ratings;
    }

    function searchResults(book, err) {
      if (err) {
        res.status = 200
        res.format({
          json: function () {
            res.json({ "Message": "Book not found" });
          }
        })
      }
      else {
        var userRating = userAvgRating(err, book);
        res.json({
          searchData: book,
          userRating: userRating
        })
      }
    }

  })

module.exports = router;
