interface ButtonProps {
    text: string;
    onClick: () => void;
    color?: "blue" | "gray"; // Optional, allows only "blue" or "gray"
  }
  
  export default function Button({ text, onClick, color = "gray" }: ButtonProps) {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded-md text-white ${
          color === "blue" ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 hover:bg-gray-700"
        }`}
      >
        {text}
      </button>
    );
  }
  