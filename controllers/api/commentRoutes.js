const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Renders all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll({
    });

    res.render('post', {
      comments,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Renders specific comment by id
router.get('/:id', async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          attributes: [
            'user_id', 
            'date_created', 
            'contents'
          ],
        }
      ]
    })
    const comment = commentData.get({ plain: true });
    res.render('dashboard', {
      comment,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Creates new comment
router.post('/', withAuth, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Edits specific comment by id
router.put('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.update (
      {
        contents: req.body.contents,
      },
      {
        where: {
          id: req.params.id,
        }
      }
    )
    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }
    res.status(200).json(commentData);
  }  catch (err) {
    res.status(500).json(err);
  }
})

// deletes specific comment by id
router.delete('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
