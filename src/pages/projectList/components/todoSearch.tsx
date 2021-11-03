import { Input, Select, Form } from "antd";
import styled from "@emotion/styled";
import { Row } from "../../../components/lib";
import FormItem from "antd/lib/form/FormItem";
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
    <Form layout="inline" style={{ marginBottom: "2rem" }}>
      <FormItem>
        <Row gap={2}>
          <Input type="text" value={param.name} onChange={changeInput} />
          <Select value={param.personId} onChange={changeSelect}>
            <Select.Option value="">全部</Select.Option>
            {users.map((user) => (
              <Select.Option key={user.id} value={user.id}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
        </Row>
      </FormItem>
    </Form>
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

const HeaderDom = styled(Row)`
  font-size: 20px;
`;
