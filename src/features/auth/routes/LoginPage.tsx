import { Button, Card, Divider } from '@nextui-org/react';
import { FcGoogle } from 'react-icons/fc';
import { useGetGoogleAuthUrlMutation, useVerifyTokenMutation } from '../api';
import toast from 'react-hot-toast';
import queryClient from '@/libs/tanstack-query';

export default function LoginPage() {
  const loginGoogleMutation = useGetGoogleAuthUrlMutation({
    onSuccess: (data) => {
      window.open(data.url, 'Google Auth', 'width=500,height=600')?.focus();

      // save local token to verify token
      localStorage.setItem('localToken', data.localToken);

      // verify token by looping every 3 seconds until success
      const interval = setInterval(() => {
        verifyTokenMutation.mutate(data.localToken, {
          onSuccess: (res) => {
            if (res.code === 200) {
              clearInterval(interval);
              queryClient.cancelQueries({ queryKey: ['verifyToken'] });
            }
          },
        });
      }, 3000);
    },
    onError: () => {
      toast.error('Something went wrong. Please try again.');
    },
  });

  const verifyTokenMutation = useVerifyTokenMutation({
    onSuccess: (data) => {
      if (data.code === 200) {
        window.close();
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        toast.success('Login successfully');
        setTimeout(() => {
          // reload page and close all popups
          window.location.reload();
        }, 1000);
      }
    },
  });

  return (
    <div className="h-[calc(100dvh)]">
      <div className="p-6 h-full w-full flex items-center justify-center">
        <Card shadow="lg" className="w-[400px] mx-auto">
          <div className="flex flex-col items-center p-6">
            <svg fill="none" height="60" viewBox="0 0 32 32" width="60">
              <path
                clipRule="evenodd"
                d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
            <p className="text-xl font-medium">Welcome Back</p>
            <p className="text-small text-default-500">Log in to your account to continue</p>
            <Divider className="my-6" />
            <Button
              onClick={() => loginGoogleMutation.mutate()}
              fullWidth
              variant="faded"
              startContent={<FcGoogle size={24} />}
            >
              Continue with Google
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
