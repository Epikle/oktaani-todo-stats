import { Bar, BarChart, Cell, ResponsiveContainer } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';

interface StatCardProps {
  title: string;
  description: string;
  unit: string;
  data: { point: number; fill?: string }[];
  loading: boolean;
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'percent',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
  signDisplay: 'exceptZero',
});

export function StatCard({
  title,
  description,
  unit,
  data,
  loading,
}: StatCardProps) {
  const previousDataPoint = data.at(-2)?.point || 0;
  const currentDataPoint = data.at(-1)?.point || 0;

  const changeFromLastMonth = formatter.format(
    previousDataPoint !== 0
      ? (currentDataPoint - previousDataPoint) / previousDataPoint
      : currentDataPoint !== 0
      ? 1
      : 0
  );

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="text-base">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="flex items-center justify-center space-x-2">
          {loading && 'Loading'}
          {!loading && (
            <div className="flex-1 text-center">
              <div className="text-5xl font-bold tracking-tighter">
                {data.at(-1) ? data.at(-1)?.point : 0}
              </div>
              <div className="text-[0.70rem] uppercase text-muted-foreground">
                {unit}
              </div>
              {changeFromLastMonth && (
                <div className="text-sm text-muted-foreground mt-2">
                  <b>{changeFromLastMonth}</b> from last month
                </div>
              )}
            </div>
          )}
        </div>
        {changeFromLastMonth && (
          <div className="my-3 h-[60px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <Bar dataKey="point">
                  {data.map((entry, index) =>
                    entry.point ? (
                      <Cell
                        key={`cell-${index}`}
                        fill={index === data.length - 1 ? '#991b1b' : 'black'}
                      />
                    ) : (
                      <Cell
                        key={`cell-${index}`}
                        height={1}
                        fill={index === data.length - 1 ? '#991b1b' : 'gray'}
                      />
                    )
                  )}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground justify-center">
        last 12 months
      </CardFooter>
    </Card>
  );
}
