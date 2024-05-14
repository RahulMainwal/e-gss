const TodoList = require("../models/todolist.model");
const { apiResponse } = require("../utils/apiResponse");

// Get all elements of todo list
const retrieveAllTodoList = async (req, res) => {
    const data = await TodoList.find({}, { __v: 0 });

    return res.status(200).json(apiResponse(200, data, "Retrieve todo all element of todo list successfully!.", true))
}

// Create a new element in todo list
const createAnElementInTodoList = async (req, res) => {
    const { text } = req.body;

    if (!text || text.length === 0) {
        return res.status(400).json(apiResponse(400, {}, "Text is required!", false));
    }

    const data = await TodoList.create({ text });

    const findSavedUser = await TodoList.findOne({ _id: data._id }, { __v: 0 });

    if (!findSavedUser) {
        return res.status(400).json(apiResponse(400, {}, "Could not save in database!", false));
    }

    return res.status(200).json(apiResponse(200, findSavedUser, "An item is created in todo list", true));

}

// Update an element from todo list by id
const updateAnElementFromTodoListById = async (req, res) => {
    const { text, _id } = req.body;

    const findElementById = await TodoList.findOne({ _id });

    if (!findElementById) {
        return res.status(404).json(apiResponse(404, {}, "Element is not found in todo list!", false));
    }

    if (!text || text.length === 0) {
        return res.status(400).json(apiResponse(400, {}, "Text is required!", false));
    }

    const updateElementById = await TodoList.findByIdAndUpdate({ _id }, { text }, { new: true });

    return res.status(200).json(apiResponse(200, updateElementById, "Element has been updated successfully!", true));

}

// Remove an element from todo list by id
const removeAnElementFromTodoListById = async (req, res) => {
    const _id = req.params.id;

    const findElementById = await TodoList.findOne({ _id });

    if (!findElementById) {
        return res.status(404).json(apiResponse(404, {}, "Element is not found in todo list!", false));
    }

    const removeElementById = await TodoList.findByIdAndDelete({ _id });

    return res.status(200).json(apiResponse(200, removeElementById, "Element has been removed successfully!", true));
}

// Delete all element or empty todo list
const deleteAllElementFromTodoList = async (req, res) => {
    const data = await TodoList.deleteMany({});

    if (data.deletedCount === 0) {
        return res.status(400).json(apiResponse(400, {}, "Todo list is already empty!", false));
    }

    if (!data.acknowledged) {
        return res.status(500).json(apiResponse(500, {}, "Could not delete all elements from todo list!", false));
    }

    return res.status(200).json(apiResponse(200, data, "All elements have been removed successfully!", true));
}

module.exports = {
    retrieveAllTodoList,
    createAnElementInTodoList,
    updateAnElementFromTodoListById,
    removeAnElementFromTodoListById,
    deleteAllElementFromTodoList
}