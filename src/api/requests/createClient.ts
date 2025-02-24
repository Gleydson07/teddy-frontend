import apiClient from "../clients/backendService";

export interface CreateClientProps {
  name: string;
  salary: number;
  companyRevenue: number;
}

export async function createClient(
  client: CreateClientProps
): Promise<CreateClientProps> {
  const clients = await apiClient.post("/clients", client);

  if (clients.status !== 201) {
    throw new Error("Erro ao cadastrar cliente");
  }

  return clients.data;
}
