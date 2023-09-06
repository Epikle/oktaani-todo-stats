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

export function Form() {
  const [input, setInput] = useState('');
  const formHandler = (event: FormEvent) => {
    event.preventDefault();
    console.log(input);
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
              <Label htmlFor="name">Authentication Token</Label>
              <Input
                id="name"
                placeholder="Type a valid token here"
                onChange={(e) => setInput(e.target.value)}
                required
              />
            </div>
            <Button className="grow" disabled={!input.length}>
              Add token
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
