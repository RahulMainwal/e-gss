const { Router } = require("express");
const { retrieveAllTodoList, createAnElementInTodoList, updateAnElementFromTodoListById, removeAnElementFromTodoListById, deleteAllElementFromTodoList } = require("../controllers/todolistControllers");

const router = Router();

// Todo list routes
router.route("/retrieve-all-elements").get(retrieveAllTodoList);
router.route("/create-a-new-element").post(createAnElementInTodoList);
router.route("/update-single-element").put(updateAnElementFromTodoListById);
router.route("/delete-an-existing-element/:id").delete(removeAnElementFromTodoListById);
router.route("/delete-all-elements").delete(deleteAllElementFromTodoList);

const todoListRouter = router;

module.exports = todoListRouter;