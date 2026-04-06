import { Table } from "@/components/retroui/Table";
import { Badge } from "../retroui/Badge";

export type User = {
  id: string;
  username: string;
  email: string;
  role: string | null;
  emailVerified: boolean;
  banned: boolean | null;
};

type UserTableProps = {
  users: User[];
};

export default function UserTable({ users }: UserTableProps) {
  return (
    <Table className="max-w-4xl mb-6 mx-auto">
      <Table.Header>
        <Table.Row>
          <Table.Head>Username</Table.Head>
          <Table.Head>Email</Table.Head>
          <Table.Head>Role</Table.Head>
          <Table.Head>Email Verified</Table.Head>
          <Table.Head>Banned</Table.Head>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {users.map((user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.username}</Table.Cell>

            <Table.Cell className="truncate max-w-[200px]">
              {user.email}
            </Table.Cell>

            <Table.Cell>
              <Badge variant="solid" size="sm">
                {user.role ?? "user"}
              </Badge>
            </Table.Cell>

            <Table.Cell>
              <Badge
                variant={user.emailVerified ? "solid" : "outline"}
                size="sm"
              >
                {user.emailVerified ? "Verified" : "Not Verified"}
              </Badge>
            </Table.Cell>

            <Table.Cell>
              <Badge size="sm">{user.banned ? "Banned" : "Active"}</Badge>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
