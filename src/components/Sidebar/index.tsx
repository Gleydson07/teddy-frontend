import { NavLink } from "react-router-dom";
import teddySvg from "../../assets/teddy.svg";
import arrowLeftSvg from "../../assets/arrowLeft.svg";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <div
      className={`transition-transform duration-500 absolute transform
        ${
          isOpen
            ? " translate-x-0 w-65 bg-white h-full shadow-[1px_0_4px_rgba(0,0,0,0.25)]"
            : "-translate-x-65"
        }
      `}
    >
      <div className="relative w-full h-[100px] bg-black/70 flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute bg-black -bottom-5 -right-5 rounded-full w-10 h-10"
        >
          <div className="flex justify-center align-center">
            <img className="w-4 h-4" src={arrowLeftSvg} alt="close" />
          </div>
        </button>
        <img src={teddySvg} alt="logo" />
      </div>

      <div className="bg-white w-full h-[calc(100vh-100px)] pt-12">
        <ul className="flex text-stone-950 flex flex-col gap-3">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "flex align-center h-10 py-2 px-4 text-orange-500"
                  : "flex align-center h-10 py-2 px-4"
              }
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.3583 6.67485L11.9 2.30819C10.8333 1.45819 9.16666 1.44985 8.10832 2.29985L2.64999 6.67485C1.86666 7.29985 1.39166 8.54985 1.55832 9.53319L2.60832 15.8165C2.84999 17.2249 4.15832 18.3332 5.58332 18.3332H14.4167C15.825 18.3332 17.1583 17.1999 17.4 15.8082L18.45 9.52485C18.6 8.54985 18.125 7.29985 17.3583 6.67485ZM10.625 14.9999C10.625 15.3415 10.3417 15.6249 9.99999 15.6249C9.65832 15.6249 9.37499 15.3415 9.37499 14.9999V12.4999C9.37499 12.1582 9.65832 11.8749 9.99999 11.8749C10.3417 11.8749 10.625 12.1582 10.625 12.4999V14.9999Z" />
              </svg>
              <span className="ml-2">Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clientes"
              className={({ isActive }) =>
                isActive
                  ? "flex align-center h-10 py-2 px-4 text-orange-500"
                  : "flex align-center h-10 py-2 px-4"
              }
            >
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2.625C7.8167 2.625 6.0417 4.4 6.0417 6.58333C6.0417 8.725 7.7167 10.4583 9.90003 10.5333C9.9667 10.525 10.0334 10.525 10.0834 10.5333C10.1 10.5333 10.1084 10.5333 10.125 10.5333C10.1334 10.5333 10.1334 10.5333 10.1417 10.5333C12.275 10.4583 13.95 8.725 13.9584 6.58333C13.9584 4.4 12.1834 2.625 10 2.625Z" />
                <path d="M14.2334 12.75C11.9084 11.2 8.1167 11.2 5.77503 12.75C4.7167 13.4583 4.13336 14.4167 4.13336 15.4417C4.13336 16.4667 4.7167 17.4167 5.7667 18.1167C6.93336 18.9 8.4667 19.2917 10 19.2917C11.5334 19.2917 13.0667 18.9 14.2334 18.1167C15.2834 17.4083 15.8667 16.4583 15.8667 15.425C15.8584 14.4 15.2834 13.45 14.2334 12.75Z" />
              </svg>
              <span className="ml-2">Clientes</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/produtos"
              className={({ isActive }) =>
                isActive
                  ? "flex align-center h-10 py-2 px-4 text-orange-500"
                  : "flex align-center h-10 py-2 px-4"
              }
            >
              <svg
                width="20"
                height="21"
                viewBox="0 0 20 21"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18.3334 8.01732V4.23398C18.3334 3.05898 17.8 2.58398 16.475 2.58398H13.1084C11.7834 2.58398 11.25 3.05898 11.25 4.23398V8.00899C11.25 9.19232 11.7834 9.65898 13.1084 9.65898H16.475C17.8 9.66732 18.3334 9.19232 18.3334 8.01732Z" />
                <path d="M18.3334 17.3923V14.0257C18.3334 12.7007 17.8 12.1673 16.475 12.1673H13.1084C11.7834 12.1673 11.25 12.7007 11.25 14.0257V17.3923C11.25 18.7173 11.7834 19.2507 13.1084 19.2507H16.475C17.8 19.2507 18.3334 18.7173 18.3334 17.3923Z" />
                <path d="M8.75002 8.01732V4.23398C8.75002 3.05898 8.21669 2.58398 6.89169 2.58398H3.52502C2.20002 2.58398 1.66669 3.05898 1.66669 4.23398V8.00899C1.66669 9.19232 2.20002 9.65898 3.52502 9.65898H6.89169C8.21669 9.66732 8.75002 9.19232 8.75002 8.01732Z" />
                <path d="M8.75002 17.3923V14.0257C8.75002 12.7007 8.21669 12.1673 6.89169 12.1673H3.52502C2.20002 12.1673 1.66669 12.7007 1.66669 14.0257V17.3923C1.66669 18.7173 2.20002 19.2507 3.52502 19.2507H6.89169C8.21669 19.2507 8.75002 18.7173 8.75002 17.3923Z" />
              </svg>
              <span className="ml-2">Produtos</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}
