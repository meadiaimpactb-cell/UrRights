import { Link } from "react-router";

export default function NotFound() {
  return (
    <div className="min-h-screen grid place-items-center bg-stone-50 p-6 text-center">
      <div>
        <div className="text-7xl font-black text-stone-300 mb-4">404</div>
        <Link to="/" className="px-6 py-3 rounded-2xl bg-[#22312c] text-white font-bold inline-block">
          ← Home
        </Link>
      </div>
    </div>
  );
}
