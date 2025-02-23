import plusSvg from "../../assets/plus.svg";
import editSvg from "../../assets/edit.svg";
import deleteSvg from "../../assets/delete.svg";

export interface CardProps {
  id: number;
  name: string;
  salary: number;
  companyRevenue: number;
  onAddClient: (id: number) => void;
  onEditClient: (id: number) => void;
  onDeleteClient: (id: number) => void;
}

export function Card({
  id,
  name,
  salary,
  companyRevenue,
  onAddClient,
  onEditClient,
  onDeleteClient,
}: CardProps) {
  function formatToCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  return (
    <div className="minw-[200px] w-[285px] h-[138px] bg-white p-4">
      <div className="w-full text-center">
        <strong>{name}</strong>
        <p>Salário: {formatToCurrency(salary)}</p>
        <p>Empresa: {formatToCurrency(companyRevenue)}</p>
      </div>
      <div className="flex justify-between h-10 mt-2">
        <button
          className="hover:opacity-80"
          onClick={() => onAddClient(id)}
          title="Adicionar à lista de clientes selecionados"
        >
          <img src={plusSvg} alt="add client to selected client list" />
        </button>
        <button
          className="hover:opacity-80"
          onClick={() => onEditClient(id)}
          title="Editar cadastro do cliente"
        >
          <img src={editSvg} alt="edit client data" />
        </button>
        <button
          className="hover:opacity-80"
          onClick={() => onDeleteClient(id)}
          title="Excluir cadastro do cliente"
        >
          <img src={deleteSvg} alt="delete client" />
        </button>
      </div>
    </div>
  );
}
