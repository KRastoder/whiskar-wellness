"use client";

import { Badge } from "@/components/retroui/Badge";
import { Table } from "@/components/retroui/Table";

type Toy = {
  id: string;
  name: string;
  price: number;
  discount: number;
  description?: string;
  sold: number;
  earnings: number;
  status: "active" | "inactive";
};

const toys: Toy[] = [
  {
    id: "1",
    name: "Wooden Robot",
    price: 4500,
    discount: 10,
    description: "Interactive wooden robot toy",
    sold: 45,
    earnings: 202500,
    status: "active",
  },
  {
    id: "2",
    name: "Teddy Bear",
    price: 2500,
    discount: 5,
    description: "Soft and cuddly teddy bear",
    sold: 120,
    earnings: 300000,
    status: "active",
  },
  {
    id: "3",
    name: "Building Blocks Set",
    price: 3500,
    discount: 15,
    description: "100-piece colorful building blocks",
    sold: 78,
    earnings: 231000,
    status: "active",
  },
  {
    id: "4",
    name: "Remote Control Car",
    price: 5500,
    discount: 0,
    description: "High-speed RC car with battery",
    sold: 34,
    earnings: 187000,
    status: "active",
  },
  {
    id: "5",
    name: "Puzzle Game",
    price: 1500,
    discount: 20,
    description: "1000-piece jigsaw puzzle",
    sold: 156,
    earnings: 187200,
    status: "inactive",
  },
  {
    id: "6",
    name: "Action Figure Set",
    price: 3000,
    discount: 8,
    description: "Set of 5 collectible action figures",
    sold: 92,
    earnings: 253200,
    status: "active",
  },
];

const getStatusVariant = (status: string) => {
  return status === "active" ? "default" : "secondary";
};

export default function ToysTable() {
  const totalEarnings = toys.reduce((sum, toy) => sum + toy.earnings, 0);
  const totalSold = toys.reduce((sum, toy) => sum + toy.sold, 0);

  return (
    <Table className="max-w-6xl mb-6 mx-auto">
      <Table.Header>
        <Table.Row>
          <Table.Head className="w-[200px]">Toy Name</Table.Head>
          <Table.Head>Price</Table.Head>
          <Table.Head>Discount</Table.Head>
          <Table.Head>Units Sold</Table.Head>
          <Table.Head>Total Earnings</Table.Head>
          <Table.Head>Status</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {toys.map((toy) => (
          <Table.Row key={toy.id}>
            <Table.Cell className="font-medium">{toy.name}</Table.Cell>
            <Table.Cell>${(toy.price / 100).toFixed(2)}</Table.Cell>
            <Table.Cell>
              <Badge variant="solid" size="sm">
                {toy.discount}%
              </Badge>
            </Table.Cell>
            <Table.Cell>{toy.sold}</Table.Cell>
            <Table.Cell className="font-medium">
              ${(toy.earnings / 100).toFixed(2)}
            </Table.Cell>
            <Table.Cell>
              <Badge variant="solid" size="sm">
                {toy.status}
              </Badge>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
      <Table.Footer>
        <Table.Row>
          <Table.Cell colSpan={3} className="font-bold">
            Totals
          </Table.Cell>
          <Table.Cell className="font-bold">{totalSold}</Table.Cell>
          <Table.Cell className="font-bold text-right">
            ${(totalEarnings / 100).toFixed(2)}
          </Table.Cell>
          <Table.Cell></Table.Cell>
        </Table.Row>
      </Table.Footer>
    </Table>
  );
}
