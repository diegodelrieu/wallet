import React from "react";

interface ButtonWithLoaderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading: boolean;
}

const ButtonWithLoader: React.FC<ButtonWithLoaderProps> = ({
  loading,
  children,
  ...props
}) => {
  return (
    <button
      className={`relative ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
      disabled={loading}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      )}
      <span>{loading ? "Loading..." : children}</span>
    </button>
  );
};

export default ButtonWithLoader;
