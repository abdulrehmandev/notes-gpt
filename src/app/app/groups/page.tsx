import Container from "@/components/layout/Container";
import React from "react";
import { Payment, columns } from "../../../../columns";
import { DataTable } from "@/components/groups/GroupsTable";

function getData(): Payment[] {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ];
}

const GroupPage = () => {
  const data = getData();
  return (
    <main className="py-4">
      <h1 className="tracking-tighter font-medium text-4xl mb-8 ml-4 md:ml-6">
        Groups
      </h1>
      <Container>
        <DataTable columns={columns} data={data} />
      </Container>
    </main>
  );
};

export default GroupPage;
