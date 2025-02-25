import minusSvg from "../../assets/minus.svg";
import plusSvg from "../../assets/plus.svg";
import editSvg from "../../assets/edit.svg";
import deleteSvg from "../../assets/delete.svg";
import { ClientType, Modal } from "../Modal";
import { useState } from "react";
import { deleteClient } from "../../api/requests/deleteClient";
import { editClient } from "../../api/requests/editClient";
import { changeSelectionClient } from "../../api/requests/changeSelectionClient";

export interface CardProps {
  id: number;
  name: string;
  salary: number;
  companyRevenue: number;
  isSelected: boolean;
  onLoadClients: () => void;
}

export function Card({
  id,
  name,
  salary,
  companyRevenue,
  isSelected = false,
  onLoadClients,
}: CardProps) {
  const [isOpenDeleteClientModal, setIsOpenDeleteClientModal] = useState(false);
  const [isOpenEditClientModal, setIsOpenEditClientModal] = useState(false);

  function formatToCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  async function handleRemoveClient(client: ClientType) {
    try {
      await deleteClient(client.id!);
      await onLoadClients();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleEditClient(client: ClientType) {
    try {
      await editClient(client.id!, client);
      await onLoadClients();
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSelectClient(id: number, isSelected: boolean) {
    try {
      await changeSelectionClient(id, isSelected);
      await onLoadClients();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="minw-[200px] w-[285px] h-[138px] bg-white p-4">
      <div className="w-full text-center">
        <strong className="block truncate" title={name}>
          {name}
        </strong>
        <p className="truncate" title={`Salário: ${formatToCurrency(salary)}`}>
          Salário: {formatToCurrency(salary)}
        </p>
        <p
          className="truncate"
          title={`Empresa: ${formatToCurrency(companyRevenue)}`}
        >
          Empresa: {formatToCurrency(companyRevenue)}
        </p>
      </div>
      <div
        className={`flex h-10 mt-2 ${
          isSelected ? "justify-end" : "justify-between"
        }`}
      >
        {isSelected ? (
          <button
            className="hover:opacity-80"
            onClick={() => handleSelectClient(id, false)}
            title="Adicionar à lista de clientes selecionados"
          >
            <img src={minusSvg} alt="add client to selected client list" />
          </button>
        ) : (
          <>
            <button
              className="hover:opacity-80"
              onClick={() => handleSelectClient(id, true)}
              title="Adicionar à lista de clientes selecionados"
            >
              <img src={plusSvg} alt="add client to selected client list" />
            </button>
            <button
              className="hover:opacity-80"
              onClick={() => setIsOpenEditClientModal(true)}
              title="Editar cadastro do cliente"
            >
              <img src={editSvg} alt="edit client data" />
            </button>
            <button
              className="hover:opacity-80"
              onClick={() => setIsOpenDeleteClientModal(true)}
              title="Excluir cadastro do cliente"
            >
              <img src={deleteSvg} alt="delete client" />
            </button>
          </>
        )}
      </div>

      <Modal
        type="delete"
        client={{ id, name, salary, companyRevenue }}
        isOpen={isOpenDeleteClientModal}
        onClose={() => setIsOpenDeleteClientModal(false)}
        onSubmit={handleRemoveClient}
      />

      <Modal
        type="edit"
        client={{ id, name, salary, companyRevenue }}
        isOpen={isOpenEditClientModal}
        onClose={() => setIsOpenEditClientModal(false)}
        onSubmit={handleEditClient}
      />
    </div>
  );
}
