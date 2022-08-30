import "./Todo.scss";
import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import TodoForm from "../TodoForm/TodoForm";
import Pagination from "./Pagination";

const LOCAL_STORAGE_KEY = "localStorage";

export default function ToDo() {
  const [defaultValues] = useState({ difficulty: 4 });
  let [list, setList] = useState([]);

  const [incomplete, setIncomplete] = useState([]);
  const [inCompleteList, setInCompleteList] = useState([]);

  const [postsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);

  const { handleChange, handleSubmit } = TodoForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter((item) => item.id !== id);
    console.log("after delete", items);
    setList(items);
    console.log("after delete list", list);
  }

  function toggleComplete(id) {
    const items = list.map((item) => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      if (item.complete === false) {
        setInCompleteList([...inCompleteList, item]);
      }

      return item;
    });
    setList(items);
  }

  useEffect(() => {
    let incompleteCount = list.filter((item) => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
  }, [list]);

  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (storage) {
      if (storage.length > 0) {
        setList(storage);
      }
    }
  }, []);

  // ----------------------------------------------------------------

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  // const currentPosts = list.map(indexOfFirstPost, indexOfLastPost);
  // const currentUncompletedPosts = incomplete.map(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // ----------------------------------------------------------------

  const handleShow = (e) => {
    let items = [];
    switch (e) {
      case "all":
        items = list.filter((item) => item);
        break;

      case "active":
        items = list.filter((item) => !item.complete);
        break;

      case "completed":
        items = list.filter((item) => item.complete);
        break;

      default:
        break;
    }
    console.log(items);
  };

  return (
    <>
      <header>
        <h3>To Do List: {incomplete} items pending</h3>
      </header>
      <form className="add-list-form" onSubmit={handleSubmit}>
        <h2>Add To Do Item</h2>

        <div>
          <div>
            <span>To Do Item</span>
            <input className="form-control" onChange={handleChange} name="text" type="text" placeholder="Item Details" />
          </div>
        </div>

        <div>
          <div>
            <span>Assigned To</span>
            <input className="form-control" onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
          </div>
        </div>

        <div>
          <label>
            <span>Difficulty</span>
            <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
          </label>
        </div>

        <div>
          <label>
            <button className="form-control-add-item" type="submit">
              Add Item
            </button>
          </label>
        </div>
      </form>

      <div className="card-container">
        {list.map((item) => (
          <div className="card-border" key={item.id}>
            <div className="card-body">
              <h2 className="card-title">{item.text}</h2>
              <h4 className="card-text">Assigned to: {item.assignee}.</h4>
              <h5 className="card-text">Difficulty : {item.difficulty}.</h5>
              <button type="button" className="btn btn-success" onClick={() => toggleComplete(item.id)}>
                Complete: {item.complete.toString()}
              </button>
              <button type="button" onClick={() => deleteItem(item.id)} className="btn btn-danger">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <br />

      {list.length > 0 ? (
        <div>
          <div>
            <button type="button" onClick={(e) => handleShow("all")} className="btn btn-primary">
              All
            </button>

            <button type="button" onClick={(e) => handleShow("active")} className="btn btn-warning">
              Active
            </button>

            <button type="button" onClick={(e) => handleShow("completed")} className="btn btn-success">
              Completed
            </button>
          </div>

          {list.length > 3 ? (
            <div>
              <Pagination postsPerPage={postsPerPage} totalPosts={list.length} paginate={paginate} />
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
