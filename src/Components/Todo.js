import { useState, useEffect, useRef } from "react";
import { Toast } from "primereact/toast";
import { fetchTodo, postTodo, deleteTodo } from "./TodoMiddleware";

function TodoApp() {
  const toast = useRef(null);

  const [todo, setTodo] = useState([
    // {
    //   input: "one",
    // },
  ]);
  const [newTodo, setnewTodo] = useState("");
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    try {
      const data = await fetchTodo();
      setTodo(data);
    } catch {
      console.error("error");
    }
  };

  const post = async () => {
    setLoading(true);
    try {
      const payload = {
        name: newTodo,
      };
      const data = await postTodo(payload);
      setTodo([...todo, data]);
      setnewTodo("");
      showToast("success", "Todo Added Successfully");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const del = async (id) => {
    try {
      await deleteTodo(id);
      const data = todo.filter((todos) => todos.id !== id);
      console.log(data, "dad");
      setTodo(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter") {
      post();
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const handleChange = (e) => {
    console.log(newTodo);
    setnewTodo(e.target.value);
  };

  const showToast = () => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Todo Added Successfully",
      style: { backgroundColor: "rgba(255, 255, 255, 0.8)" },
    });
  };

  return (
    <>
      <Toast ref={toast} />
      <div className="input_section">
        <h1>TO-DO</h1>
        {loading ? (
          <div>
            <i
              className="fa fa-spinner fa-spin"
              style={{ fontSize: "24px", color: "white" }}
            ></i>{" "}
          </div>
        ) : (
          <div className="inpp">
            <input
              type="text"
              className="input"
              value={newTodo}
              onChange={handleChange}
              onKeyUp={handleKey}
              placeholder="What's your plan today?.."
            />
            {/* {loading && <div><i className="fa fa-spinner fa-spin" style={{fontSize:'24px', color:'white'}}></i> </div> } */}
          </div>
        )}
        {/* <button id="but" onClick={post}>
          <i className="fa fa-plus" />
  </button>*/}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {
          <div>
            {/* <ul> */}
            {todo.map((todoList) => (
              <>
                <div className="todoList">
                  <li>{todoList.name}</li>
                  {/* <li>{todoList.input}</li> */}
                  <div onClick={() => del(todoList.id)} className="delete">
                    <i className="fa fa-trash-o" />
                  </div>
                </div>
              </>
            ))}
            {/* </ul> */}
          </div>
        }
      </div>
    </>
  );
}
export default TodoApp;
