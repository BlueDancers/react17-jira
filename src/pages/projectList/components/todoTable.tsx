import { User } from "./todoSearch";
import { Table, TableProps } from "antd";
import { title } from "process";
import dayjs from "dayjs";

type Project = {
  id: string;
  name: string;
  personId: string;
  organization: string;
  created: number;
};

interface TodTableProps extends TableProps<any> {
  users: User[];
}

export default function TodoTable({ users, ...props }: TodTableProps) {
  return (
    <Table
      pagination={false}
      rowKey={"id"}
      columns={[
        {
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          title: "部门",
          dataIndex: "organization",
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
        {
          title: "创建时间",
          render(value, item) {
            return (
              <span>
                {item.created ? dayjs(item.created).format("YYYY-MM-DD") : ""}
              </span>
            );
          },
        },
      ]}
      {...props}
    />
  );
}
