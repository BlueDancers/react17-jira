import { useEffect, useState } from "react";

export default function Search({ users, param, setParam }) {
  return (
    <div>
      <input type="text" value={param.name} onChange={changeInput} />
      <select value={param.presonId} onChange={changeSelect}>
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
