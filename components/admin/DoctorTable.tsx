import { Table } from "@/components/retroui/Table";
import { Badge } from "../retroui/Badge";
import type { Specialty } from "@/lib/validator";

export type Doctor = {
  id: string;
  name: string;
  username: string;
  email: string;
  image: string | null;
  specialty: Specialty;
  vetenaryLisenceNumber: number;
  price: number;
  experience: number;
  country: string;
  city: string;
  address: string;
  rating: number | null;
};

type DoctorTableProps = {
  doctors: Doctor[];
};

export default function DoctorTable({ doctors }: DoctorTableProps) {
  return (
    <Table className="max-w-5xl mb-6 mx-auto">
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Username</Table.Head>
          <Table.Head>Email</Table.Head>
          <Table.Head>Specialty</Table.Head>
          <Table.Head>License</Table.Head>
          <Table.Head>Experience</Table.Head>
          <Table.Head>City</Table.Head>
          <Table.Head>Country</Table.Head>
          <Table.Head>Address</Table.Head>
          <Table.Head className="text-right">Rating</Table.Head>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {doctors.map((doctor) => (
          <Table.Row key={doctor.id}>
            <Table.Cell>{doctor.name}</Table.Cell>
            <Table.Cell>{doctor.username}</Table.Cell>
            <Table.Cell className="truncate max-w-[150px]">
              {doctor.email}
            </Table.Cell>
            <Table.Cell>
              <Badge variant="solid" size="sm">
                {doctor.specialty}
              </Badge>
            </Table.Cell>
            <Table.Cell>{doctor.vetenaryLisenceNumber}</Table.Cell>
            <Table.Cell>{doctor.experience} yrs</Table.Cell>
            <Table.Cell>{doctor.city}</Table.Cell>
            <Table.Cell>{doctor.country}</Table.Cell>
            <Table.Cell>{doctor.address}</Table.Cell>
            <Table.Cell className="text-right">
              {doctor.rating ?? "N/A"}
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
}
