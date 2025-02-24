import apiClient from "../clients/backendService";

export interface ClientProps {
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

export async function findClientsPaginated(
  itemsPerPage: number,
  page: number
): Promise<ClientProps> {
  const clients = await apiClient.get("/clients", {
    params: {
      itemsPerPage,
      page,
    },
  });

  if (clients.status !== 200) {
    throw new Error("Erro ao buscar clientes");
  }

  return clients.data;
}
