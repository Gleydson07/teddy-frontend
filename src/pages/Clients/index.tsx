import { ChangeEvent, useEffect, useState } from "react";
import apiClient from "../../api/clients/backendService";
import { Card } from "../../components/Card";

interface ClientProps {
  data: {
    id: number;
    name: string;
    salary: number;
    companyRevenue: number;
    isSelected: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
  pagination: {
    firstPage: number | null;
    currentPage: number;
    previousPage: number | null;
    nextPage: number | null;
    lastPage: number | null;
    itemsPerPage: number;
    totalItems: number;
  };
}

export default function Clients() {
  const [clients, setClients] = useState<ClientProps>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(16);

  async function loadClients() {
    try {
      const response = await apiClient.get("/clients", {
        params: {
          itemsPerPage,
          page:
            itemsPerPage !== clients?.pagination.itemsPerPage ? 1 : currentPage,
        },
      });

      if (response.status === 200) {
        setClients(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    setItemsPerPage(Number(event.target.value));
  }

  useEffect(() => {
    (async () => loadClients())();
  }, [itemsPerPage, currentPage]);

  return (
    <div className="mx-auto my-6 w-7xl h-auto flex flex-col px-8">
      <div className="flex w-full justify-between">
        <h1 className="text-lg font-normal text-stone-950">
          <strong>{clients?.pagination.totalItems}</strong> cliente(s)
          encontrados
        </h1>

        <div className="flex h-min">
          <h1 className="text-lg font-normal text-stone-950">
            Clientes por página:
          </h1>

          <select
            name="clientsPerPage"
            id="clientsPerPage"
            className="rounded-sm border-1 border-gray-300 p-2 h-8 text-xs ml-1"
            value={itemsPerPage}
            onChange={handleSelectChange}
          >
            <option value={16}>16</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {clients?.data.length &&
          clients.data.map((client) => (
            <Card
              key={client.id}
              id={client.id}
              name={client.name}
              salary={client.salary}
              companyRevenue={client.companyRevenue}
              onAddClient={() => {}}
              onEditClient={() => {}}
              onDeleteClient={() => {}}
            />
          ))}
      </div>

      <div className="w-full my-4">
        <button className="rounded-sm border-1 border-orange-500 text-orange-500 py-1 px-4 w-full hover:opacity-80">
          Criar cliente
        </button>
      </div>

      <div className="mb-4 flex w-full justify-center">
        <button
          className={
            clients?.pagination.firstPage && clients?.pagination.firstPage > 0
              ? "rounded-xs font-bold mx-1 py-1 px-2"
              : "hidden"
          }
          onClick={() => setCurrentPage(clients?.pagination.firstPage!)}
        >
          {clients?.pagination.firstPage}
        </button>
        {clients?.pagination.firstPage &&
          clients?.pagination.previousPage &&
          clients?.pagination.previousPage > 2 && <strong>...</strong>}
        <button
          className={
            clients?.pagination.previousPage &&
            clients?.pagination.previousPage > 0
              ? "rounded-xs font-bold mx-1 py-1 px-2"
              : "hidden"
          }
          onClick={() => setCurrentPage(clients?.pagination.previousPage!)}
        >
          {clients?.pagination.previousPage}
        </button>
        <button
          className="rounded-xs font-bold bg-orange-500 text-white mx-1 py-1 px-2"
          onClick={() => setCurrentPage(clients?.pagination.currentPage!)}
        >
          {clients?.pagination.currentPage}
        </button>
        <button
          className={
            clients?.pagination.nextPage && clients?.pagination.nextPage > 0
              ? "rounded-xs font-bold mx-1 py-1 px-2"
              : "hidden"
          }
          onClick={() => setCurrentPage(clients?.pagination.nextPage!)}
        >
          {clients?.pagination.nextPage}
        </button>
        {clients?.pagination.nextPage &&
          clients?.pagination.lastPage &&
          clients?.pagination.nextPage < clients?.pagination.lastPage - 1 && (
            <strong>...</strong>
          )}
        <button
          className={
            clients?.pagination.lastPage && clients?.pagination.lastPage > 0
              ? "rounded-xs font-bold mx-1 py-1 px-2"
              : "hidden"
          }
          onClick={() => setCurrentPage(clients?.pagination.lastPage!)}
        >
          {clients?.pagination.lastPage}
        </button>
      </div>
    </div>
  );
}
