import { useEffect, useState } from "react";
import {
  ClientProps,
  findClientsPaginated,
} from "../../api/requests/findClientsPaginated";
import { changeManySelectionClient } from "../../api/requests/changeManySelectionClient";
import { CardList } from "../../components/CardList";
import { initialClient } from "../Clients";

export default function SelectedClients() {
  const [clients, setClients] = useState<ClientProps>(initialClient);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(16);

  async function handleUnselectClients() {
    await changeManySelectionClient(false);
    await loadClients();
  }

  async function loadClients() {
    try {
      const response = await findClientsPaginated(
        itemsPerPage,
        itemsPerPage !== clients?.pagination.itemsPerPage ? 1 : currentPage,
        true
      );

      setClients(response);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    (async () => loadClients())();
  }, [itemsPerPage, currentPage]);

  return (
    <CardList
      data={clients?.data!}
      pagination={clients?.pagination!}
      isSelected
      onLoadClients={loadClients}
      onRemoveClients={handleUnselectClients}
      itemsPerPage={itemsPerPage}
      onChangeItemsPerPage={setItemsPerPage}
      onChangeCurrentPage={setCurrentPage}
    />
  );
}
