import React, { useEffect, useState } from 'react';
import "../App.css"
import axios from 'axios';

function PencilToCreate({getCurrenItems}) {

  const [openModal, setOpenModal] = useState(false);
  const [text, setText] = useState("");
  
  const onCreateHandler = async() => {
    try {
      const {data} = await axios.post(`${import.meta.env.VITE_APP_BASE_URL}/create-a-new-element`, {text});
      getCurrenItems(data)
      setText("")
  } catch (error) {
      console.log(error)
  }
  setOpenModal(false)
  }

  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    }else{
      
        document.body.style.overflow = "scroll"
  
    }
  }, [openModal]); 

  return (
    <div>
      <div id="pencil_btn" style={{ display: "block", position: "fixed", right: "50px", bottom: "50px" }}>
        <span onClick={() => setOpenModal(true)} className="btn btn-floating text-white btn-lg" style={{ backgroundColor: "black" }} type="button" data-mdb-toggle="modal" data-mdb-target="#exampleModal" data-mdb-whatever="@mdo">
          <i className="fas fa-pencil-alt"></i>
        </span>
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
                    <textarea value={text} onChange={(e) => setText(e.target.value)} className="form-control input input-outline-dark" id="message-text"></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => onCreateHandler()} className="btn btn-dark me-2" id="add_task_btn" data-mdb-dismiss="modal">Add</button>
                <button onClick={() => setOpenModal(false)} type="button" className="btn btn-outline-dark" data-mdb-dismiss="modal">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default PencilToCreate
