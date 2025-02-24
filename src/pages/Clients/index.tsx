import { ChangeEvent, useEffect, useState } from "react";
import { Card } from "../../components/Card";
import { ClientType, Modal } from "../../components/Modal";
import teddySvg from "../../assets/teddy.svg";
import {
  ClientProps,
  findClientsPaginated,
} from "../../api/requests/findClientsPaginated";
import { createClient } from "../../api/requests/createClient";

export default function Clients() {
  const [clients, setClients] = useState<ClientProps>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(16);
  const [isOpenCreateClientModal, setIsOpenCreateClientModal] = useState(false);

  async function loadClients() {
    try {
      const response = await findClientsPaginated(
        itemsPerPage,
        itemsPerPage !== clients?.pagination.itemsPerPage ? 1 : currentPage
      );

      setClients(response);
    } catch (error) {
      console.error(error);
    }
  }

  async function newClient(client: ClientType) {
    try {
      await createClient(client);
      await loadClients();
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

  if (!clients?.data.length) {
    return (
      <div className="m-auto h-full w-7xl">
        <div className="flex flex-col w-full h-full justify-center items-center">
          <img src={teddySvg} alt="logo" width={200} />
          <div className="w-60 mt-8">
            <button
              onClick={() => setIsOpenCreateClientModal(true)}
              className="rounded-sm border-1 border-orange-500 text-orange-500 py-1 px-4 w-full hover:opacity-80"
            >
              Criar cliente
            </button>
          </div>
        </div>

        <Modal
          type="create"
          isOpen={isOpenCreateClientModal}
          onClose={() => setIsOpenCreateClientModal(false)}
          onSubmit={newClient}
        />
      </div>
    );
  }

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
              isSelected={client.isSelected}
              onLoadClients={loadClients}
            />
          ))}
      </div>

      <div className="w-full my-4">
        <button
          onClick={() => setIsOpenCreateClientModal(true)}
          className="rounded-sm border-1 border-orange-500 text-orange-500 py-1 px-4 w-full hover:opacity-80"
        >
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

      <Modal
        type="create"
        isOpen={isOpenCreateClientModal}
        onClose={() => setIsOpenCreateClientModal(false)}
        onSubmit={newClient}
      />
    </div>
  );
}
