import React from "react";
import qs from "qs";
import { useEffect, useState } from "react";
import TodoSearch from "./components/todoSearch";
import TodoTable from "./components/todoTable";
import { cancelObj, useArray, useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";

// 请求地址
const Url = process.env.REACT_APP_API_URL;

export default function List() {
  const [users, setUsers]: any = useState([]);
  const [todolist, setTodoList]: any = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  // useArray使用
  // const [arrays, setArrays] = useState([2]);
  // const { value, add, clear, removeIndex } = useArray(arrays);
  // add(1);

  const client = useHttp();
  useMount(() => {
    client("users").then((res) => {
      setUsers(res);
    });
  });
  // 经过去抖处理的参数
  const debounceParam = useDebounce(param, 200);
  // 去抖处理的
  useEffect(() => {
    client("projects", { data: cancelObj(debounceParam) }).then((res) => {
      console.log(res);
      setTodoList(res);
    });
  }, [debounceParam]);

  return (
    <div>
      <TodoSearch users={users} param={param} setParam={setParam} />
      <TodoTable list={todolist} users={users} />
    </div>
  );
}
