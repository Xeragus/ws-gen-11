const { blogPostModel } = require('../models/blog-post')
const successResponse = require('../lib/success-response-sender');
const errorResponse = require('../lib/error-response-sender');
const nodemailer = require('../lib/nodeMailer');

module.exports = {
  fetchAll: async (req, res) => {
    try {
      const blogPosts = await blogPostModel.find().populate('category', 'name').populate('user')
      successResponse(res, 'List of all blog posts', blogPosts);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  },
  fetchOne: async (req, res) => {
    try {
      const blogPost = await blogPostModel.findById(req.params.id).populate('category', 'name').populate('user')
      if (!blogPost) errorResponse(res, 400, 'No user with the provided id')

      successResponse(res, `Post with id #${req.params.id}`, blogPost);
    } catch (error) {
      errorResponse(res, 500, error.message)
    }
  },
  create: async (req, res) => {
    try {
      const blogPost = await blogPostModel.create(req.body);
      if (blogPost) { nodemailer(req.user.email) }
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
      successResponse(res, 'Blog post updated', blogPost);
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
  likes: async (req, res) => {
    try {
      const post = await blogPostModel.findById(req.params.id)
      if (!post.likes.includes(req.body.user)) {
        await post.updateOne({ $push: { likes: req.body.user } })
        successResponse(res, "The post has been liked", post)
      }
      return errorResponse(res, 404, 'The post has already been liked with the provided user');
    } catch (err) {
      errorResponse(res, 500, 'Internal Server Error')
    }
  },
  dislike: async (req, res) => {
    try {
      const post = await blogPostModel.findById(req.params.id)
      if (post.likes.includes(req.body.user)) {
        await post.updateOne({ $pull: { likes: req.body.user } })
        successResponse(res, "The post has been disliked", post)
      }
      return errorResponse(res, 404, 'Not Found');
    } catch (err) {
      errorResponse(res, 500, 'Internal Server Error')
    }
  }
}
