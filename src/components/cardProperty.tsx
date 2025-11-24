type CardImovelProps = {
  id?: number;
  nome: string;
  imagem: string;
  endereco: string;
  preco: number;
};

export function CardImovel({ nome, imagem, endereco, preco }: CardImovelProps) {
  return (
    <div className="p-4 shadow rounded bg-white max-w-sm">
      <img
        src={imagem}
        alt={nome}
        className="w-full h-48 object-cover rounded"
      />

      <h2 className="text-xl font-semibold mt-2">{nome}</h2>

      <p className="text-gray-600">{endereco}</p>

      <p className="text-green-600 font-bold mt-2">
        R$ {preco.toLocaleString()}
      </p>
    </div>
  );
}
