import apiClient from "../clients/backendService";

export interface EditClientProps {
  name: string;
  salary: number;
  companyRevenue: number;
}

export async function editClient(
  id: number,
  client: EditClientProps
): Promise<void> {
  const clients = await apiClient.put(`/clients/${id}`, client);

  if (clients.status !== 204) {
    throw new Error("Erro ao editar cliente");
  }
}
