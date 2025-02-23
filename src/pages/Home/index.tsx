import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type Inputs = {
  user: string;
};

export default function Home() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    localStorage.setItem("user_name", JSON.stringify(data.user));

    navigate("/clientes");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center h-screen"
    >
      <h1 className="text-4xl font-normal text-stone-950">
        Olá, seja bem-vindo!
      </h1>
      <div className="my-5 flex flex-col">
        <input
          id="user"
          type="text"
          {...register("user", { required: true })}
          placeholder="Digite seu nome:"
          className="w-[521px] h-15 rounded-sm border-2 border-gray-200 p-4"
        />
        {errors.user && <span>Este campo é obrigatório</span>}
      </div>
      <button
        type="submit"
        className="w-[521px] h-15 rounded-sm font-bold text-2xl text-white bg-orange-500 cursor-pointer"
      >
        Entrar
      </button>
    </form>
  );
}
