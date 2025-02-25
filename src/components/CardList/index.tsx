import { ChangeEvent } from "react";
import { ClientProps } from "../../api/requests/findClientsPaginated";
import teddySvg from "../../assets/teddy.svg";
import { Card } from "../Card";
import { Pagination } from "./Pagination";

interface CardListProps extends ClientProps {
  isSelected?: boolean;
  itemsPerPage: number;
  onRemoveClients?: () => void;
  onLoadClients: () => void;
  onCreateClient?: () => void;
  onChangeItemsPerPage: (value: number) => void;
  onChangeCurrentPage: (value: number) => void;
}

export function CardList({
  data,
  pagination,
  isSelected,
  itemsPerPage,
  onRemoveClients,
  onChangeItemsPerPage,
  onChangeCurrentPage,
  onLoadClients,
  onCreateClient,
}: CardListProps) {
  function handleSelectItemsPerPage(event: ChangeEvent<HTMLSelectElement>) {
    onChangeItemsPerPage(Number(event.target.value));
  }

  if (!data.length) {
    return (
      <div className="m-auto h-full w-7xl">
        <div className="flex flex-col w-full h-full justify-center items-center">
          <img src={teddySvg} alt="logo" width={200} />
          {!isSelected ? (
            <div className="w-60 mt-8">
              <button
                onClick={onCreateClient}
                className="rounded-sm border-1 border-orange-500 text-orange-500 py-1 px-4 w-full hover:opacity-80"
              >
                Criar cliente
              </button>
            </div>
          ) : (
            <h1 className="mt-8">Nada aqui por enquanto...</h1>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto my-6 w-7xl h-auto flex flex-col px-8">
      <div className="flex w-full justify-between">
        <h1 className="text-lg font-normal text-stone-950">
          <strong>{pagination.totalItems}</strong> cliente(s) encontrados
        </h1>

        <div className="flex h-min">
          <h1 className="text-lg font-normal text-stone-950">
            Clientes por página:
          </h1>

          <select
            name="clientsPerPage"
            id="clientsPerPage"
            className="rounded-sm border-1 border-gray-300 p-2 h-8 text-xs ml-1"
            value={itemsPerPage}
            onChange={handleSelectItemsPerPage}
          >
            <option value={16}>16</option>
            <option value={24}>24</option>
            <option value={48}>48</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mt-4">
        {data.length &&
          data.map((dt) => (
            <Card
              key={dt.id}
              id={dt.id}
              name={dt.name}
              salary={dt.salary}
              companyRevenue={dt.companyRevenue}
              isSelected={dt.isSelected}
              onLoadClients={onLoadClients}
            />
          ))}
      </div>

      <div className="w-full my-4">
        <button
          onClick={!isSelected ? onCreateClient : onRemoveClients}
          className="rounded-sm border-1 border-orange-500 text-orange-500 py-1 px-4 w-full hover:opacity-80"
        >
          {!isSelected ? "Criar cliente" : "Limpar clientes selecionados"}
        </button>
      </div>

      <Pagination
        firstPage={pagination.firstPage}
        currentPage={pagination.currentPage}
        previousPage={pagination.previousPage}
        nextPage={pagination.nextPage}
        lastPage={pagination.lastPage}
        itemsPerPage={pagination.itemsPerPage}
        totalItems={pagination.totalItems}
        onChangeCurrentPage={onChangeCurrentPage}
      />
    </div>
  );
}
