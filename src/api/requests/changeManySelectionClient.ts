import apiClient from "../clients/backendService";

export async function changeManySelectionClient(
  isSelected: boolean
): Promise<void> {
  const clients = await apiClient.patch(`/clients/selection`, {
    isSelected: isSelected,
  });

  if (clients.status !== 204) {
    throw new Error("Erro ao editar status de seleção de todos os clientes");
  }
}
