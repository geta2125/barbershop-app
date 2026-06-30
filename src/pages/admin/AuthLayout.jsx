import { Link } from "react-router-dom";
import logoGroomGold from "/img/logopfl_geta.png"; // Pastikan path logo benar

export default function AuthLayout({ children, title, subtitle, linkTo, linkText }) {
  return (
    <div className="min-h-screen bg-[#0d0d14] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logoGroomGold} alt="Groom Gold" className="w-24 h-24 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-gray-400 mt-2">
            {subtitle}{' '}
            <Link to={linkTo} className="font-semibold text-[#dfb34c] hover:underline">
              {linkText}
            </Link>
          </p>
        </div>
        <div className="bg-[#1a1a26] border border-[#2a2a3a] rounded-2xl p-8">
          {children}
        </div>
      </div>
    </div>
  );
}