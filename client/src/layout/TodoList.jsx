import React, { useEffect, useState } from 'react';
import axios from "axios";
import PencilToCreate from '../components/PencilToCreate';
import Header from '../components/Header';

function TodoList() {

    const [items, setItems] = useState([]);
    const [text, setText] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [idForUpdate, setIdForUpdate] = useState("");

    const onRemoveHandler = async (id) => {
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/delete-an-existing-element/${id}`);
            console.log(data.message)
            if (data.success) {
                const newArray = items.filter((item) => {
                    if (item._id !== id) {
                        return item;
                    }
                })
                setItems(newArray)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const onDeleteAllItemsHandler = async () => {
        try {
            const { data } = await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/delete-all-elements`);
            console.log(data.message)
            if (data.success) {
                alert(data.message)
                setItems([])
            }
        } catch (error) {
            console.log(error)
        }
    }


    const getCurrenItems = (data) => {
        setItems([...items, data.data]);
    }

    const updateAnItem = async () => {
        try {
            const { data } = await axios.put(`${import.meta.env.VITE_APP_BASE_URL}/update-single-element/`, { _id: idForUpdate, text });
            console.log(data.message)
            if (data.success) {
                const newArray = items.map((item) => {
                    if (item._id === idForUpdate) {
                        return {
                            _id: item._id,
                            text: text,
                            createtedAt: item.createtedAt,
                            updatedAt: item.updatedAt,
                        }
                    } else {
                        return item;
                    }
                })

                setItems(newArray)
            }
        } catch (error) {
            console.log(error)
        }
        setOpenModal(false)
        setText("")
        setIdForUpdate("")
    }

    useEffect(() => {
        (async () => {
            try {
                const { data } = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/retrieve-all-elements`);
                setItems(data.data)
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    useEffect(() => {
        if (openModal) {
            document.body.style.overflow = "hidden";
        } else {

            document.body.style.overflow = "scroll"

        }
    }, [openModal]);

    return (
        <>
            <Header onDeleteAllItemsHandler={onDeleteAllItemsHandler} />
            <div className='container'>
                <ol className="list-group list-group-light my-2">
                    {
                        items.map((item) => (
                            <li key={item._id} style={{ paddingLeft: "10px", paddingRight: "10px", margin: "10px 0", backgroundColor: "white", borderRadius: "5px", boxShadow: "rgb(229, 229, 223) 1px 1px 2px 1px" }} className="todo_list_item list-group-item d-flex justify-content-between align-items-start">
                                <div className="ms-2 me-auto" style={{whiteSpace: "pre-wrap"}}>
                                    {item.text}
                                </div>
                                <span onClick={() => { setIdForUpdate(item._id); setText(item.text); setOpenModal(true); }} data-mdb-toggle="modal" data-mdb-target="#deleteModal" className="hidden-arrow me-3" id="navbarDropdownMenuLinkAction" role="button" aria-expanded="false">
                                    <i className="fas fa-pen-to-square"></i>
                                </span>
                                <span onClick={() => onRemoveHandler(item._id)} data-mdb-toggle="modal" data-mdb-target="#deleteModal" className="hidden-arrow" id="navbarDropdownMenuLinkAction" role="button" aria-expanded="false">
                                    <i className="fas fa-trash"></i>
                                </span>
                            </li>
                        ))
                    }
                </ol>
                <PencilToCreate getCurrenItems={getCurrenItems} />
            </div>
            {
                openModal && <div className='overlay'>
                    <div className="modal-dialog" style={{ background: "white" }}>
                        <div className="modal-content" style={{ padding: "20px" }}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add task into the list</h5>
                                <button type="button" onClick={() => setOpenModal(false)} className="btn-close" data-mdb-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="message-text" className="col-form-label">Enter the task here:</label>
                                        <textarea value={text} onChange={(e) => setText(e.target.value)} className="textareaForModal form-control input input-outline-dark" id="message-text"></textarea>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={() => updateAnItem()} className="btn btn-dark me-2" id="add_task_btn" data-mdb-dismiss="modal">Add</button>
                                <button onClick={() => setOpenModal(false)} type="button" className="btn btn-outline-dark" data-mdb-dismiss="modal">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default TodoList
