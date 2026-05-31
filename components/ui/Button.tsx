type ButtonProps = {
    children: React.ReactNode;
  };
  
  export default function Button({ children }: ButtonProps) {
    return (
      <button className="bg-white text-black px-6 py-3 rounded-2xl font-semibold hover:scale-105 transition-all duration-300">
        {children}
      </button>
    );
  }