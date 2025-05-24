import * as React from "react"
import { Modal } from "antd"
import type { ModalProps } from "antd"
import { cn } from "@/lib/utils"

export interface DialogProps extends Omit<ModalProps, 'title'> {
  title?: React.ReactNode
  description?: React.ReactNode
  children?: React.ReactNode
  footer?: React.ReactNode
}

const Dialog = ({
  title,
  description,
  children,
  footer,
  className,
  ...props
}: DialogProps) => {
  return (
    <Modal
      title={
        <div className="flex flex-col gap-1">
          {title && <div className="text-lg font-semibold">{title}</div>}
          {description && (
            <div className="text-sm text-gray-500">{description}</div>
          )}
        </div>
      }
      className={cn("", className)}
      footer={footer}
      {...props}
    >
      {children}
    </Modal>
  )
}

Dialog.displayName = "Dialog"

export { Dialog } 