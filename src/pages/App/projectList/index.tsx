import React from "react";
import { useEffect, useState } from "react";
import TodoSearch from "./components/todoSearch";
import TodoTable from "./components/todoTable";

// 请求地址
const Url = "http://localhost:3001";

export default function List() {
  const [users, setUsers]: any = useState([]);
  const [todolist, setTodoList]: any = useState([]);
  const [param, setParam] = useState({
    name: "",
    presonId: "",
  });
  useEffect(() => {
    console.log(process.env);
    fetch(`${Url}/users`)
      .then(async (res) => {
        if (res.ok) {
          let data = await res.json();
          console.log(data);
          setUsers(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [param]);

  useEffect(() => {
    fetch(`${Url}/projects`)
      .then(async (res) => {
        if (res.ok) {
          let data = await res.json();

          setTodoList(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <TodoSearch users={users} param={param} setParam={setParam} />
      <TodoTable list={todolist} users={users} />
    </div>
  );
}
