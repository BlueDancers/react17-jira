import { User } from "./todoSearch";
import { Table } from "antd";
import { title } from "process";

type Project = {
  id: string;
  name: string;
  personId: string;
};

interface TodTableProps {
  list: Project[];
  users: User[];
}

export default function TodoTable({ list, users }: TodTableProps) {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "负责人",
          render(value, item) {
            return (
              <span>
                {users.find((user) => user.id === item.personId)?.name ||
                  "未知"}
              </span>
            );
          },
        },
      ]}
      dataSource={list}
    />
  );
}
