const Button = ({ text, onClick }: any) => {
  return (
    <button
      type="button"
      className="flex justify-center items-center h-7 w-20 text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium rounded-lg text-xs px-4 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white dark:focus:ring-blue-800"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
