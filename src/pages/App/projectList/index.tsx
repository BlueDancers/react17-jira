import React from "react";
import qs from "qs";
import { useEffect, useState } from "react";
import TodoSearch from "./components/todoSearch";
import TodoTable from "./components/todoTable";
import { cancelObj } from "../../../utils";

// 请求地址
const Url = "http://localhost:3001";

export default function List() {
  const [users, setUsers]: any = useState([]);
  const [todolist, setTodoList]: any = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  useEffect(() => {
    fetch(`${Url}/users`)
      .then(async (res) => {
        if (res.ok) {
          let data = await res.json();
          setUsers(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    console.log(param);

    fetch(`${Url}/projects?${qs.stringify(cancelObj(param))}`)
      .then(async (res) => {
        if (res.ok) {
          let data = await res.json();
          setTodoList(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [param]);

  return (
    <div>
      <TodoSearch users={users} param={param} setParam={setParam} />
      <TodoTable list={todolist} users={users} />
    </div>
  );
}
