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
      <input type="text" value={param.name} onChange={changeInput} />
      <select value={param.personId} onChange={changeSelect}>
        <option value="">全部</option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
    </div>
  );

  function changeInput(event) {
    setParam({
      ...param,
      name: event.target.value,
    });
  }
  function changeSelect(event) {
    setParam({
      ...param,
      personId: event.target.value,
    });
  }
}
