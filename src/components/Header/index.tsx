import { NavLink } from "react-router-dom";
import menuSandwichSvg from "../../assets/sandwichMenu.svg";
import teddySvg from "../../assets/teddy.svg";

interface HeaderProps {
  onClickMenu: () => void;
}

export function Header({ onClickMenu }: HeaderProps) {
  const user = JSON.parse(localStorage.getItem("user_name") || "user");

  return (
    <header className="w-auto h-25 shadown-bg flex justify-between items-center px-12 shadow-[1px_0_4px_rgba(0,0,0,0.25)]">
      <div className="flex items-center">
        <button onClick={onClickMenu}>
          <img src={menuSandwichSvg} alt="menu" />
        </button>

        <img className="ml-12" src={teddySvg} alt="logo" />
      </div>

      <nav>
        <ul className="flex text-stone-950">
          <li>
            <NavLink
              to="/clientes"
              end
              className={({ isActive }) =>
                isActive
                  ? "p-4 text-orange-500 underline underline-offset-3"
                  : "p-4"
              }
            >
              Clientes
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/clientes/selecionados"
              className={({ isActive }) =>
                isActive
                  ? "p-4 text-orange-500 underline underline-offset-3"
                  : "p-4"
              }
            >
              Clientes selecionados
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "p-4 text-orange-500 underline underline-offset-3"
                  : "p-4"
              }
            >
              Sair
            </NavLink>
          </li>
        </ul>
      </nav>

      <div>
        <span>
          Olá, <strong>{user}</strong>!
        </span>
      </div>
    </header>
  );
}
