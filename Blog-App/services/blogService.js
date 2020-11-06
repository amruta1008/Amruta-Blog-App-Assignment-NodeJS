var Post = require("../models/blogPost");  


//adding the blog post
exports.createPost = ( addPost, callback) => {
    console.log(addPost);

    let postDao = new Post(addPost);

    postDao.save( ( err, data) => {
        
        if(!err){
            console.log(`adding the post in blog`);
            console.log(data);
        }
        callback(err, data);
    })
}

//Listing down all blog posts
exports.getPosts = (callback ) => {
    Post.find( (err, data) => {
        if(!err){
            console.log(`listing all the posts`);
            console.log(data);
        }
        callback(err, data);
    });
}

//viewing the single blog Post
exports.getPostById = (id, callback) => {
    Post.findOne({ postId: id }, ( err, data ) => {
        if(!err){
            console.log(`viewing the post by postid:${id}`);
            console.log(data);
        }
        callback(err, data);
    });
}

//Editing Blog Post
exports.editPost = (id, postData, callback ) => {
    console.log( id);
    Post.updateOne( { postId: id }, postData, (err, data) => {
        if(!err){
            console.log(`post with ${id}is updated successfully`);
            console.log(data);
        }
        callback(err, data);
    });
}

//deleting the post
exports.deletePost = (_postId, callback) => {
  
    Post.deleteOne({ postId: _postId }, (err, status ) => {
      let msg = 'Not Deleted! Some Error Occured!'; 
      if(!err){
        console.log(status);
        if(status.n==0)
         msg = `the post is not present with ${_postId}`;
        else if(status.n = 1 && status.ok == 1){
          msg = 'Deleted Successfully!';
        }
        if(err)
        msg = 'not able to delete post';
      }
      callback(err, msg);
    });
  }
