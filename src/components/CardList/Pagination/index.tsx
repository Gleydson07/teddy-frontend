import { PaginationProps } from "../../../api/requests/findClientsPaginated";

interface PaginationComponentProps extends PaginationProps {
  onChangeCurrentPage: (value: number) => void;
}

export function Pagination(data: PaginationComponentProps) {
  return (
    <div className="mb-4 flex w-full justify-center">
      <button
        className={
          data.firstPage && data.firstPage > 0
            ? "rounded-xs font-bold mx-1 py-1 px-2"
            : "hidden"
        }
        onClick={() => data.onChangeCurrentPage(data.firstPage!)}
      >
        {data.firstPage}
      </button>
      {data.firstPage && data.previousPage && data.previousPage > 2 && (
        <strong>...</strong>
      )}
      <button
        className={
          data.previousPage && data.previousPage > 0
            ? "rounded-xs font-bold mx-1 py-1 px-2"
            : "hidden"
        }
        onClick={() => data.onChangeCurrentPage(data.previousPage!)}
      >
        {data.previousPage}
      </button>
      <button
        className="rounded-xs font-bold bg-orange-500 text-white mx-1 py-1 px-2"
        onClick={() => data.onChangeCurrentPage(data.currentPage!)}
      >
        {data.currentPage}
      </button>
      <button
        className={
          data.nextPage && data.nextPage > 0
            ? "rounded-xs font-bold mx-1 py-1 px-2"
            : "hidden"
        }
        onClick={() => data.onChangeCurrentPage(data.nextPage!)}
      >
        {data.nextPage}
      </button>
      {data.nextPage && data.lastPage && data.nextPage < data.lastPage - 1 && (
        <strong>...</strong>
      )}
      <button
        className={
          data.lastPage && data.lastPage > 0
            ? "rounded-xs font-bold mx-1 py-1 px-2"
            : "hidden"
        }
        onClick={() => data.onChangeCurrentPage(data.lastPage!)}
      >
        {data.lastPage}
      </button>
    </div>
  );
}
