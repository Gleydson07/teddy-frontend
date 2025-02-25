import apiClient from "../clients/backendService";

export interface ClientDataProps {
  id: number;
  name: string;
  salary: number;
  companyRevenue: number;
  isSelected: boolean;
  createdAt: Date;
  updatedAt: Date;
}
export interface PaginationProps {
  firstPage: number | null;
  currentPage: number;
  previousPage: number | null;
  nextPage: number | null;
  lastPage: number | null;
  itemsPerPage: number;
  totalItems: number;
}

export interface ClientProps {
  data: ClientDataProps[];
  pagination: PaginationProps;
}

export async function findClientsPaginated(
  itemsPerPage: number,
  page: number,
  isSelected?: boolean
): Promise<ClientProps> {
  const clients = await apiClient.get("/clients", {
    params: {
      itemsPerPage,
      page,
      isSelected,
    },
  });

  if (clients.status !== 200) {
    throw new Error("Erro ao buscar clientes");
  }

  return clients.data;
}
