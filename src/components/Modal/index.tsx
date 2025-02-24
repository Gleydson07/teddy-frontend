import ReactDOM from "react-dom";
import { SubmitHandler, useForm } from "react-hook-form";

export type ClientType = {
  id?: number;
  name: string;
  salary: number;
  companyRevenue: number;
};

type ActionType = "create" | "edit" | "delete" | "select";

interface GenericModalProps {
  type: ActionType;
  client?: ClientType;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (client: ClientType, type?: ActionType) => void;
}

export function Modal({
  type,
  client,
  isOpen,
  onClose,
  onSubmit,
}: GenericModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientType>({
    defaultValues: {
      name: client?.name,
      salary: client?.salary,
      companyRevenue: client?.companyRevenue,
    },
  });

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot || !isOpen) return null;

  const title =
    type === "create"
      ? "Criar Cliente"
      : type === "edit"
      ? "Editar Cliente"
      : "Excluir Cliente";

  function handleClose() {
    reset();
    onClose();
  }

  const handleSubmitForm: SubmitHandler<ClientType> = (data) => {
    onSubmit(
      {
        id: client?.id,
        name: data.name,
        salary: Number(data.salary),
        companyRevenue: Number(data.companyRevenue),
      },
      type
    );
    handleClose();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-black/80">
      <div className="bg-white p-4 rounded shadow-lg">
        <div className="flex justify-between">
          <h2 className="text-base font-bold mb-4">{title}:</h2>
          <button className="text-gray-400 font-bold" onClick={handleClose}>
            x
          </button>
        </div>

        {type === "delete" && client && (
          <div className="flex flex-col w-92">
            <p>
              Você está prestes a excluir o cliente:{" "}
              <strong>{client?.name}</strong>
            </p>
            <button
              className="h-10 bg-orange-500 text-white mt-2 rounded-sm"
              onClick={() => onSubmit(client)}
            >
              {title}
            </button>
          </div>
        )}

        {type !== "delete" && (
          <form
            className="flex flex-col gap-2 w-72"
            onSubmit={handleSubmit(handleSubmitForm)}
          >
            <input
              type="text"
              className="border-1 border-gray-300 rounded-sm p-2 h-10 text-base"
              placeholder="Digite o nome:"
              {...register("name", { required: true })}
            />
            {errors.name && <span>Este campo é obrigatório</span>}

            <input
              type="number"
              step="0.01"
              className="border-1 border-gray-300 rounded-sm p-2 h-10 text-base"
              placeholder="Digite o salário:"
              {...register("salary", { required: true })}
            />
            {errors.salary && <span>Este campo é obrigatório</span>}

            <input
              type="number"
              step="0.01"
              className="border-1 border-gray-300 rounded-sm p-2 h-10 text-base"
              placeholder="Digite o valor da empresa:"
              {...register("companyRevenue", { required: true })}
            />
            {errors.companyRevenue && <span>Este campo é obrigatório</span>}

            <button
              className="h-10 bg-orange-500 text-white mt-2 rounded-sm"
              type="submit"
            >
              {title}
            </button>
          </form>
        )}
      </div>
    </div>,
    modalRoot
  );
}
