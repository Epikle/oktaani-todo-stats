import { Bar, BarChart, ResponsiveContainer } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

interface StatCardProps {
  title: string;
  description: string;
  unit: string;
  data: { point: number; fill?: string }[];
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  signDisplay: 'exceptZero',
});

export function StatCard({ title, description, unit, data }: StatCardProps) {
  const changeFromLastMonth =
    data.length > 1
      ? formatter.format(
          (data.at(-1)!.point - data.at(-2)!.point) / data.at(-2)!.point
        )
      : null;

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-center space-x-2">
          <div className="flex-1 text-center">
            <div className="text-5xl font-bold tracking-tighter">
              {data.at(-1) ? data.at(-1)?.point : 0}
            </div>
            <div className="text-[0.70rem] uppercase text-muted-foreground">
              {unit}
            </div>
            {changeFromLastMonth && (
              <div className="text-sm text-muted-foreground mt-2">
                {changeFromLastMonth} from last month
              </div>
            )}
          </div>
        </div>
        {changeFromLastMonth && (
          <div className="my-3 h-[60px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar dataKey="point" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
