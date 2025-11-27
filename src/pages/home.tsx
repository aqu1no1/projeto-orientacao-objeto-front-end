
import casa1 from "../assets/Properties/casa1.jpg";
import casa2 from "../assets/Properties/casa2.jpg";
import casa3 from "../assets/Properties/casa3.jpg";
import casa4 from "../assets/Properties/casa4.jpg";
import casa5 from "../assets/Properties/casa5.jpg";
import news1 from "../assets/Properties/news1.jpg";
import news2 from "../assets/Properties/news2.jpg";
import news3 from "../assets/Properties/news3.jpg";
import news4 from "../assets/Properties/news4.jpg";
import news5 from "../assets/Properties/news5.jpg";
import { CardNews } from "../components/cardNews";
import CarouselNews from "../components/carouselNews";

const lista = [
  {
    id: 1,
    titulo: "Increase in Demand for Residential Properties in 2025",
    imagem: casa1,
    texto:
      "With lower interest rates and greater availability of housing credit, the real estate sector is showing stronger-than-expected growth in early 2025. Experts point out that mid-range properties are the most sought after.",
  },
  {
    id: 2,
    titulo: "Sustainable Condominiums Gain Ground in Major Cities",
    imagem: casa2,
    texto:
      "Developments featuring solar energy, water reuse systems, and expanded green areas are becoming a trend in the market. Buyers are seeking options that reduce costs and improve quality of life.",
  },
  {
    id: 3,
    titulo: "New Property Launches Recover After Two Years of Decline",
    imagem: casa3,
    texto:
      "Construction companies are resuming major projects after a period of downturn. Metropolitan regions are leading the volume of new residential and commercial launches.",
  },
  {
    id: 4,
    titulo: "Rental Prices Show the Slowest Increase in Five Years",
    imagem: casa4,
    texto:
      "According to specialized institutes, rental price increases have slowed down in 2025, bringing relief to those seeking housing in large cities.",
  },
  {
    id: 5,
    titulo: "3D Technology Revolutionizes Real Estate Sales",
    imagem: casa5,
    texto:
      "3D virtual tours and augmented reality are now present in more than 40% of Brazilian real estate agencies. The adoption of this technology promises to transform the buyer experience.",
  },
];

const listaNews = [
  {
    id: 1,
    imagem: news1,
  },
  {
    id: 2,
    imagem: news2,
  },
  {
    id: 3,
    imagem: news3,
  },
  {
    id: 4,
    imagem: news4,
  },
  {
    id: 5,
    imagem: news5,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 px-6 sm:px-8 pb-20">
        <div className="mb-16">
          <CarouselNews itens={listaNews} />
        </div>

        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-gray-900">
            Property Market <span className="text-gray-600">News</span>
          </h2>
          <p className="text-gray-500 mt-2">
            Stay updated with trends, opportunities and insights.
          </p>
          <div className="w-24 h-1 bg-gray-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-9 justify-items-center">
          {lista.map((item) => (
            <CardNews key={item.id} {...item} />
          ))}
        </div>
      </main>
    </div>
  );
}
