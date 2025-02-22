export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-normal text-stone-950">
        Olá, seja bem-vindo!
      </h1>
      <input
        type="text"
        name="user"
        id="user"
        placeholder="Digite seu nome:"
        className="w-[521px] h-15 rounded-sm border-2 border-gray-200 p-4 my-5"
      />
      <button
        onClick={() => console.log("click")}
        className="w-[521px] h-15 rounded-sm font-bold text-2xl text-white bg-orange-500 cursor-pointer"
      >
        Entrar
      </button>
    </div>
  );
}
