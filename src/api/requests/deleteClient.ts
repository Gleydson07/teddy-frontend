import apiClient from "../clients/backendService";

export async function deleteClient(clientId: number): Promise<void> {
  const clients = await apiClient.delete(`/clients/${clientId}`);

  if (clients.status !== 204) {
    throw new Error("Erro ao excluir cliente");
  }
}
