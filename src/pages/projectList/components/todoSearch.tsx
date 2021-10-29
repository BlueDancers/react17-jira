import { Input, Select } from "antd";

interface TodoSearchProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: TodoSearchProps["param"]) => void;
}

export interface User {
  name: string;
  id: string;
  token: string;
}

export default function Search({ users, param, setParam }: TodoSearchProps) {
  return (
    <div>
      <Input type="text" value={param.name} onChange={changeInput} />
      <Select value={param.personId} onChange={changeSelect}>
        <Select.Option value="">全部</Select.Option>
        {users.map((user) => (
          <Select.Option key={user.id} value={user.id}>
            {user.name}
          </Select.Option>
        ))}
      </Select>
    </div>
  );

  function changeInput(event) {
    setParam({
      ...param,
      name: event.target.value,
    });
  }
  function changeSelect(value) {
    setParam({
      ...param,
      personId: value,
    });
  }
}
