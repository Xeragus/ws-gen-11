const { blogPostModel } = require('../models/blog-post&user')
const successResponse = require('../lib/handlers/success-response-sender');
const errorResponse = require('../lib/handlers/error-response-sender');
const enrichBlogPost = require('../lib/enrichers/blogposts');
const mailgun = require('../lib/mails/mailgun');
const pdf = require('../lib/mails/pdf')

module.exports = {
  fetchAll: async (req, res) => {
    try {
      const blogPosts = await blogPostModel.find()
        .populate('category', 'name')
        .populate('user', ['email', 'full_name'])
        .populate('city', 'name')

      successResponse(res, 'List of all blog posts', blogPosts);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  },
  fetchOne: async (req, res) => {
    try {
      let blogPost = await blogPostModel.findById(req.params.id)
        .populate('category', 'name')
        .populate('user', ['email', 'full_name'])
        .populate('city', 'name')

      if (!blogPost) errorResponse(res, 400, 'No user with the provided id');
      
      successResponse(res, `Post with id #${req.params.id}`, await enrichBlogPost(blogPost));
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  },
  create: async (req, res) => {
    try {
      const blogPost = await blogPostModel.create(req.body);

      pdf()
      mailgun()
      successResponse(res, 'New blog post created', blogPost);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  },
  patchUpdate: async (req, res) => {
    try {
      const blogPost = await blogPostModel.findByIdAndUpdate(req.params.id, req.body)
      successResponse(res, 'Blog post updated', blogPost);
    } catch (error) {
      errorResponse(res, 500, {
        ...req.body,
        _id: req.params.id,
        error: error.message
      })
    }
  },
  putUpdate: async (req, res) => {
    try {
      const blogPost = await blogPostModel.findOneAndReplace({ _id: req.params.id }, req.body)
      successResponse(res, 'Blog post replaced', blogPost);
    } catch (error) {
      errorResponse(res, 500, {
        ...req.body,
        _id: req.params.id,
        error: error.message
      })
    }
  },
  delete: async (req, res) => {
    try {
      await blogPostModel.remove({ _id: req.params.id });
      res.send(`BlogPost ${req.params.id} is deleted`);
    } catch (error) {
      res.send({ message: error });
    }
  },
  like: async (req, res) => {
    try {
      const post = await blogPostModel.findById(req.params.id);
      if (!post.likes.includes(req.user.id)) {
        await post.updateOne({ $push: { likes: req.user.id } });
        res.status(200).json("The post has been liked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
  dislike: async (req, res) => {
    try {
      const post = await blogPostModel.findById(req.params.id);
      if (post.likes.includes(req.user.id)) {
        await post.updateOne({ $pull: { likes: req.user.id } });
        res.status(200).json("The post has been disliked");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },
}