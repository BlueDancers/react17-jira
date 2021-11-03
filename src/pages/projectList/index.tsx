import React from "react";
import { useEffect, useState } from "react";
import TodoSearch from "./components/todoSearch";
import TodoTable from "./components/todoTable";
import { cancelObj, useArray, useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import { Typography } from "antd";

// 请求地址
const Url = process.env.REACT_APP_API_URL;

export default function List() {
  const [users, setUsers]: any = useState([]);
  const [todolist, setTodoList]: any = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setErrror] = useState<null | Error>(null);
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
    setLoading(true);
    client("projects", { data: cancelObj(debounceParam) })
      .then((res) => {
        console.log(res);
        setTodoList(res);
      })
      .catch((err) => {
        setErrror(err);
        setTodoList([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debounceParam]);

  return (
    <div>
      <TodoSearch users={users} param={param} setParam={setParam} />
      {error && (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      )}
      <TodoTable loading={loading} dataSource={todolist} users={users} />
    </div>
  );
}
