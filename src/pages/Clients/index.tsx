import { useEffect, useState } from "react";
import { ClientType, Modal } from "../../components/Modal";
import {
  ClientProps,
  findClientsPaginated,
} from "../../api/requests/findClientsPaginated";
import { createClient } from "../../api/requests/createClient";
import { CardList } from "../../components/CardList";

export const initialClient = {
  data: [],
  pagination: {
    currentPage: 1,
    itemsPerPage: 16,
    totalItems: 0,
    firstPage: null,
    lastPage: null,
    nextPage: null,
    previousPage: null,
  },
};

export default function Clients() {
  const [clients, setClients] = useState<ClientProps>(initialClient);
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

  useEffect(() => {
    (async () => loadClients())();
  }, [itemsPerPage, currentPage]);

  return (
    <>
      <CardList
        data={clients?.data!}
        pagination={clients?.pagination!}
        itemsPerPage={itemsPerPage}
        onLoadClients={loadClients}
        onCreateClient={() => setIsOpenCreateClientModal(true)}
        onChangeItemsPerPage={setItemsPerPage}
        onChangeCurrentPage={setCurrentPage}
      />

      <Modal
        type="create"
        isOpen={isOpenCreateClientModal}
        onClose={() => setIsOpenCreateClientModal(false)}
        onSubmit={newClient}
      />
    </>
  );
}
