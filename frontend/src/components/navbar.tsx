import { BarChart4, History, ShoppingCart, FileBox } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import photoImg from "../../foto.jpg";

export function NavBar() {
  const alo = useLocation();

  return (
    <div className="w-full h-screen">
      <div className="w-[350px] h-screen bg-gray-700 p-10">
        <div className="flex flex-col gap-[80px]">
          <div className="flex gap-5">
            <img src={photoImg} alt="" className="max-w-16 rounded-full" />
            <div>
              <p className="font-bold text-slate-100 text-xl">
                Chefe de produção
              </p>
              <p className="text-slate-400 text-lg">Italo Ferreira</p>
            </div>
          </div>
          <div>
            <ul className="flex flex-col gap-4 text-lg text-slate-300">
              <Link
                to="/products?page=1"
                className={`cursor-pointer hover:bg-slate-500 p-3 rounded-md transition-colors flex items-center gap-2 ${
                  alo.pathname.includes("/products")
                    ? "bg-slate-500 text-white"
                    : "bg-gray-700"
                }`}
              >
                <ShoppingCart />
                Produtos
              </Link>
              <Link
                to="/demand?page=1"
                className={`cursor-pointer hover:bg-slate-500 p-3 rounded-md transition-colors flex items-center gap-2 ${
                  alo.pathname.includes("/demand")
                    ? "bg-slate-500 text-white"
                    : "bg-gray-700"
                }`}
              >
                <FileBox />
                Pedidos
              </Link>

              <Link
                to="/history?page=1"
                className={`cursor-pointer hover:bg-slate-500 p-3 rounded-md transition-colors flex items-center gap-2 ${
                  alo.pathname.includes("/history")
                    ? "bg-slate-500 text-white"
                    : "bg-gray-700"
                }`}
              >
                <History />
                Historico
              </Link>
              <Link
                to="/statics"
                className={`cursor-pointer hover:bg-slate-500 p-3 rounded-md transition-colors flex items-center gap-2 ${
                  alo.pathname.includes("/statics")
                    ? "bg-slate-500 text-white"
                    : "bg-gray-700"
                }`}
              >
                <BarChart4 />
                Estatisticas
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
