export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#090817] py-7 text-center text-xs text-slate-500">
      © {new Date().getFullYear()} Asilbek. Built with React & TypeScript.
    </footer>
  );
}
