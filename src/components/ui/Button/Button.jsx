import { cva } from "class-variance-authority"
import { cn } from "../../../utils/cn"
import PropTypes from "prop-types"

const buttonVariants = cva(
  "px-4 py-0.5 rounded-[10px] border transition-colors duration-200 hover:cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-lime-400 text-black border-lime-400 hover:bg-lime-500",
        outline: "bg-transparent text-white border-white hover:bg-white hover:text-black",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
)

function Button({ className, variant, onClick, ...props }) {
  return (
    <button
      onClick={onClick}
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    />
  )
}

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["primary", "outline"]),
  onClick: PropTypes.func,
}

export default Button
