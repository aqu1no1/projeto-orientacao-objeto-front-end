type CardNewsProps = {
  imagem: string;
  titulo: string;
  texto: string;
};

export function CardNews({ imagem, titulo, texto }: CardNewsProps) {
  return (
    <div className="flex gap-4 p-4 shadow rounded bg-white w-full h-40">
      <img src={imagem} className="w-40 h-full object-cover rounded" />

      <div className="flex flex-col justify-center">
        <h2 className="text-lg font-semibold">{titulo}</h2>
        <p className="text-gray-600 text-sm line-clamp-3">{texto}</p>
      </div>
    </div>
  );
}
