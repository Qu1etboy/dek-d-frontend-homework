import { cn } from "@/utils/cn";

type ButtonProps = {
  children: React.ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button(props: ButtonProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex items-center gap-2 text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed bg-white border border-gray-300 focus:outline-none hover:text-orange-500 hover:bg-orange-100 hover:border-orange-100 focus:ring-4 focus:ring-orange-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 duration-300",
        props.className
      )}
      {...props}
    >
      {props.children}
    </button>
  );
}
