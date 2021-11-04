import React from "react";
import { useEffect, useState } from "react";
import TodoSearch from "./components/todoSearch";
import TodoTable from "./components/todoTable";
import { cancelObj, useArray, useDebounce, useMount } from "../../utils";
import { useHttp } from "../../utils/http";
import { Typography } from "antd";
import { useAsync } from "../../utils/useAsync";

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

  const projectData = useAsync<any[]>();

  useMount(() => {
    client("users").then((res) => {
      setUsers(res);
    });
  });

  // 经过去抖处理的参数
  const debounceParam = useDebounce(param, 200);
  // 去抖处理的
  useEffect(() => {
    projectData
      .run(client("projects", { data: cancelObj(debounceParam) }))
      .then((data) => {
        console.log(data);
      });
  }, [debounceParam]);

  return (
    <div>
      <TodoSearch users={users} param={param} setParam={setParam} />
      {projectData.error && (
        <Typography.Text type={"danger"}>
          {projectData.error.message}
        </Typography.Text>
      )}
      <TodoTable
        loading={projectData.isLoading}
        dataSource={projectData.data || []}
        users={users}
      />
    </div>
  );
}
