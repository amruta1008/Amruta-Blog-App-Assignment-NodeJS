var express = require('express');
var router = express.Router();
var blogService = require('../../services/blogService');




/* GET post details */
router.get('/', function (req, res, next) {

  blogService.getPosts((err, data) => {
    console.log(data);
    if (!err) {
      res.json(data);
    } else {
      res.json(err);
    }
  });


});


/* GET post details by id */
router.get('/:postId', function (req, res, next) {

  console.log(req.params.postId);
  blogService.getPostById(req.params.postId, (err, data) => {
    console.log(data);
    if (!err) {
      res.json(data);
    } else {
      res.json(err);
    }
  });
});


router.post('/', (req, res) => {
  console.log(req.body);

  //send it to the Service 
  blogService.createPost(req.body, (err, data) => { //get the resp from the service 
    console.log(data);

    if (!err) {
      res.json(data); // send it back to rest client
    } else {
      res.json(err);
    }
  });
});



/* PUT blog posts */
router.put('/:postId', (req, res) => {
  console.log(req.body);

  blogService.editPost(req.params.postId, req.body, (err, data) => {
    console.log(data);
    if (!err) {
      blogService.getPostById(req.params.postId, (err, data) => {
        console.log(data);
        if (!err) {
          res.json(data);
        } else {
          res.json(err);
        }
      });
    } else {
      res.json(err);
    }
  });

});

//deleting post by id
/* DELETE contacts/1 */
router.delete('/:id', (req, res, next) => {
  console.log(req.params.id); // working with url params 

  blogService.deletePost(req.params.id, (err, data) => {
    if (!err) {
      res.json(data);
    } else {
      res.json(err);
    }
  })
});

module.exports = router;
