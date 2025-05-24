import * as React from "react"
import { Form } from "antd"
import type { FormItemProps } from "antd"
import { cn } from "@/lib/utils"

export interface LabelProps extends Omit<FormItemProps, 'label'> {
  children?: React.ReactNode
  required?: boolean
  htmlFor?: string
}

const Label = React.forwardRef<HTMLDivElement, LabelProps>(
  ({ className, children, required, htmlFor, ...props }, ref) => {
    return (
      <div ref={ref}>
        <Form.Item
          label={
            <label
              htmlFor={htmlFor}
              className={cn(
                "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                className
              )}
            >
              {children}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          }
          required={required}
          {...props}
        />
      </div>
    )
  }
)

Label.displayName = "Label"

export { Label }
