export interface ClassName {
  className?: React.ComponentProps<"div">["className"];
}

export interface CustomButtonProps extends ClassName {
  text: string;
  type: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
}
