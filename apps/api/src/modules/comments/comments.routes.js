const { Router } = require('express');
const { getComments, addComment, deleteComment } = require('./comments.controller');
const { authMiddleware } = require('../../middlewares/auth.middleware');

const router = Router();

router.get('/recipes/:recipeId/comments', getComments);
router.post('/recipes/:recipeId/comments', authMiddleware, addComment);
router.delete('/comments/:id', authMiddleware, deleteComment);

module.exports = router;
