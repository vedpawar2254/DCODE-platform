import { Toaster as Sonner } from "sonner";

const Toaster = ({ ...props }) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-gray-800 group-[.toaster]:text-white group-[.toaster]:border-gray-700 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-gray-300",
          actionButton: "group-[.toast]:bg-gray-700 group-[.toast]:text-white",
          cancelButton: "group-[.toast]:bg-gray-600 group-[.toast]:text-white",
          error:
            "group toast group-[.toaster]:bg-red-900 group-[.toaster]:text-red-100 group-[.toaster]:border-red-800",
          success:
            "group toast group-[.toaster]:bg-green-900 group-[.toaster]:text-green-100 group-[.toaster]:border-green-800",
          warning:
            "group toast group-[.toaster]:bg-yellow-900 group-[.toaster]:text-yellow-100 group-[.toaster]:border-yellow-800",
          info: "group toast group-[.toaster]:bg-blue-900 group-[.toaster]:text-blue-100 group-[.toaster]:border-blue-800",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
