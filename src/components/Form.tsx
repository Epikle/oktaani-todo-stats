import { FormEvent, useState } from 'react';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { useTokenStore } from '@/stores/useTokenStore';
import { getStats } from '@/services/stats';
import { cn } from '@/lib/utils';
import { StatsTypes } from '@/lib/types';

export function Form() {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const setToken = useTokenStore((state) => state.setToken);

  const formHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await getStats(StatsTypes.newCollection, input);
      setToken(input);
    } catch (error) {
      setError('Invalid token, please try again.');
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Please supply a token for authentication.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formHandler}>
          <div className="grid gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name" className={cn({ 'text-red-600': error })}>
                Authentication Token
              </Label>
              <Input
                id="name"
                placeholder="Type a valid token here"
                onChange={(e) => {
                  setError('');
                  setInput(e.target.value);
                }}
                required
              />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button className="grow" disabled={!input.length || !!error}>
              Add token
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
