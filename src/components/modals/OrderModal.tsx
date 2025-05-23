import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Icons } from '@/components/icons';

const orderSchema = z.object({
  customerName: z.string().min(1, 'Tên khách hàng là bắt buộc'),
  customerEmail: z.string().email('Email không hợp lệ'),
  customerPhone: z.string().min(1, 'Số điện thoại là bắt buộc'),
  shippingAddress: z.string().min(1, 'Địa chỉ giao hàng là bắt buộc'),
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'cancelled'], {
    required_error: 'Trạng thái đơn hàng là bắt buộc',
  }),
  notes: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: OrderFormData) => void;
  initialData?: OrderFormData;
  isLoading?: boolean;
}

export function OrderModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading = false,
}: OrderModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: initialData,
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Cập nhật đơn hàng' : 'Thêm đơn hàng mới'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerName">Tên khách hàng</Label>
            <Input
              id="customerName"
              {...register('customerName')}
              className={errors.customerName ? 'border-red-500' : ''}
            />
            {errors.customerName && (
              <p className="text-sm text-red-500">{errors.customerName.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerEmail">Email</Label>
            <Input
              id="customerEmail"
              type="email"
              {...register('customerEmail')}
              className={errors.customerEmail ? 'border-red-500' : ''}
            />
            {errors.customerEmail && (
              <p className="text-sm text-red-500">{errors.customerEmail.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="customerPhone">Số điện thoại</Label>
            <Input
              id="customerPhone"
              {...register('customerPhone')}
              className={errors.customerPhone ? 'border-red-500' : ''}
            />
            {errors.customerPhone && (
              <p className="text-sm text-red-500">{errors.customerPhone.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="shippingAddress">Địa chỉ giao hàng</Label>
            <Textarea
              id="shippingAddress"
              {...register('shippingAddress')}
              className={errors.shippingAddress ? 'border-red-500' : ''}
            />
            {errors.shippingAddress && (
              <p className="text-sm text-red-500">{errors.shippingAddress.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Trạng thái</Label>
            <select
              id="status"
              {...register('status')}
              className={`w-full rounded-md border ${
                errors.status ? 'border-red-500' : 'border-input'
              } bg-transparent px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <option value="pending">Chờ xử lý</option>
              <option value="processing">Đang xử lý</option>
              <option value="shipped">Đang giao hàng</option>
              <option value="delivered">Đã giao hàng</option>
              <option value="cancelled">Đã hủy</option>
            </select>
            {errors.status && (
              <p className="text-sm text-red-500">{errors.status.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Ghi chú</Label>
            <Textarea
              id="notes"
              {...register('notes')}
              className={errors.notes ? 'border-red-500' : ''}
            />
            {errors.notes && (
              <p className="text-sm text-red-500">{errors.notes.message}</p>
            )}
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                initialData ? 'Cập nhật' : 'Thêm mới'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 