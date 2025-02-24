import apiClient from "../clients/backendService";

export interface EditClientProps {
  name: string;
  salary: number;
  companyRevenue: number;
}

export async function changeSelectionClient(
  id: number,
  isSelected: boolean
): Promise<void> {
  const clients = await apiClient.patch(`/clients/${id}/selection`, {
    isSelected: isSelected,
  });

  if (clients.status !== 204) {
    throw new Error("Erro ao editar cliente");
  }
}
