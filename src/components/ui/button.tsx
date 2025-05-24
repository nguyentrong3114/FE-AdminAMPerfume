import * as React from "react"
import { Button as AntButton } from "antd"
import type { ButtonProps as AntButtonProps } from "antd"
import { cn } from "@/lib/utils"

type CustomVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'

export interface ButtonProps extends Omit<AntButtonProps, 'type'> {
  customVariant?: CustomVariant
  type?: 'primary' | 'default' | 'dashed' | 'text' | 'link'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, customVariant = 'default', type, ...props }, ref) => {
    const getButtonType = () => {
      switch (customVariant) {
        case 'destructive':
          return 'primary'
        case 'outline':
          return 'default'
        case 'secondary':
          return 'default'
        case 'ghost':
          return 'text'
        case 'link':
          return 'link'
        default:
          return type || 'primary'
      }
    }

    const getButtonClassName = () => {
      switch (customVariant) {
        case 'destructive':
          return 'bg-red-500 hover:bg-red-600 text-white'
        case 'outline':
          return 'border border-gray-300 hover:bg-gray-100'
        case 'secondary':
          return 'bg-gray-100 hover:bg-gray-200 text-gray-900'
        case 'ghost':
          return 'hover:bg-gray-100'
        case 'link':
          return 'text-blue-500 hover:text-blue-600'
        default:
          return ''
      }
    }

    return (
      <AntButton
        ref={ref}
        type={getButtonType()}
        className={cn(getButtonClassName(), className)}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"

export { Button } 