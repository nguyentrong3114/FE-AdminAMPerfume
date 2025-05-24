import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';
import gsap from 'gsap';

const secondPasswordSchema = z.object({
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  confirmPassword: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp",
  path: ["confirmPassword"],
});

type SecondPasswordFormData = z.infer<typeof secondPasswordSchema>;

export default function SecondPasswordPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SecondPasswordFormData>({
    resolver: zodResolver(secondPasswordSchema),
  });



  const onSubmit = async (data: SecondPasswordFormData) => {
    try {
      setIsLoading(true);
      // TODO: Implement second password logic here
      console.log(data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate('/dashboard');
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-3xl card-container">
        <Card className="border-none shadow-2xl rounded-2xl overflow-hidden">
          <CardHeader className="space-y-2 p-8">
            <CardTitle className="text-3xl font-bold text-center">Mật khẩu cấp 2</CardTitle>
            <CardDescription className="text-center text-lg">
              Vui lòng nhập mật khẩu cấp 2 của bạn
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-lg text-white">Mật khẩu cấp 2</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  className={`${errors.password ? 'border-red-500' : ''} h-12 text-lg rounded-xl`}
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-lg text-white">Xác nhận mật khẩu</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register('confirmPassword')}
                  className={`${errors.confirmPassword ? 'border-red-500' : ''} h-12 text-lg rounded-xl`}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                )}
              </div>
              <Button
                customVariant="outline"
                className="w-full h-12 text-lg rounded-xl bg-white hover:bg-gray-100 text-black font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-5 w-5 animate-spin text-black" />
                    Đang xử lý...
                  </>
                ) : (
                  'Xác nhận'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}