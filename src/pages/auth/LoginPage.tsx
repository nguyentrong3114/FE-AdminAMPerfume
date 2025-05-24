import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Icons } from '@/components/icons';

const loginSchema = z.object({
    email: z.string().email('Email không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            setIsLoading(true);
            // TODO: Implement login logic here
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
        <div className="min-h-screen flex items-center justify-center p-4 ">
            <div
                className="w-full max-w-3xl"
            >
                <Card className="border-none shadow-2xl rounded-2xl overflow-hidden">
                    <CardHeader className="space-y-2 p-8"> 
                        <CardTitle className="text-3xl font-bold text-center">Đăng nhập</CardTitle> 
                        <CardDescription className="text-center text-lg"> 
                            Nhập thông tin đăng nhập của bạn để tiếp tục
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="px-8 pb-8">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6"> 
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-lg">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="name@example.com"
                                    {...register('email')}
                                    className={`${errors.email ? 'border-red-500' : ''} h-12 text-lg rounded-xl`} 
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">{errors.email.message}</p>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-lg">Mật khẩu</Label>
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
                            <Button
                                type="submit"
                                className="w-full h-12 text-lg rounded-xl border-2" 
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <>
                                        <Icons.spinner className="mr-2 h-5 w-5 animate-spin" /> 
                                        Đang đăng nhập...
                                    </>
                                ) : (
                                    'Đăng nhập'
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}