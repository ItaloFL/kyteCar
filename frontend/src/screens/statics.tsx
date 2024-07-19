import { CalendarIcon, DollarSign, NotepadText } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { Button } from "../components/ui/button";
import { DateRange } from "react-day-picker";
import { useEffect, useState } from "react";
import { format, subDays } from "date-fns";
import { Calendar } from "../components/ui/calendar";
import { api } from "../lib/axios";
import { converterData } from "../utils/convertData";
import { StaticsCartesianSkeleton } from "../components/skeletons/static-cartesian-skeleton";

interface PeriodDataType {
  id: string;
  date: string;
  offer: number;
}

interface MonthOrdersAmountResponse {
  monthOrders: PeriodDataType[];
  monthOrdersAmount: number;
}

interface GetTodayOrdersAmountResponse {
  totalOrdersToday: number
}

export function Statics() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: subDays(new Date(), 6),
    to: new Date(),
  });

  const [periodData, setPeriodData] = useState<PeriodDataType[]>([]);
  const [todayOrdersAmount, setTodayOrdersAmount] = useState<number>();
  const [monthOrdersAmount, setMonthOrdersAmount] =
    useState<MonthOrdersAmountResponse>();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function handleGetStaticsDate() {
    if (date?.to && date.from) {
      const initialDate = converterData(date?.from);
      const finalDate = converterData(date?.to);
      
      try {
        const response = await api.get(
          `statics?initialDate=${initialDate}&finalDate=${finalDate}`
        );
        
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        setPeriodData(response.data.result);
        handleGetTodayAmountOrders();
        handleGetMonthAmountOrders();
        setError(null)
        setLoading(false);
      } catch (error: any) {
        setError(error);
      }
    }
  }

  async function handleResetPeriod() {
    setError(null);
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setDate({
      from: subDays(new Date(), 6),
      to: new Date(),
    });
    setLoading(false);
  }

  async function handleGetTodayAmountOrders() {
    const response = await api.get<GetTodayOrdersAmountResponse>(`statics/todayorders`);
    setTodayOrdersAmount(response.data.totalOrdersToday);
  }

  async function handleGetMonthAmountOrders() {
    const response = await api.get<MonthOrdersAmountResponse>(
      `statics/monthamount`
    );
  
    setMonthOrdersAmount(response.data);
  }

  useEffect(() => {
    handleGetStaticsDate();
  }, [date]);

  return (
    <div className="bg-slate-200 p-20">
      <div className="bg-slate-50 h-full rounded-md p-20">
        <div className="flex flex-col justify-between gap-28">
          <div className="flex items-center justify-center gap-10">
            <div className="bg-zinc-300 w-[300px] h-[120px] p-3 rounded-md">
              <div className="flex justify-between items-start">
                <p className="text-zinc-600 text-lg font-semibold">
                  Receita total (mês)
                </p>
                <DollarSign size={20} opacity={0.8} />
              </div>

              <span className="flex items-start mt-2 text-xl font-bold">
                {monthOrdersAmount?.monthOrders
                  .reduce(
                    (acc: number, currentValue: PeriodDataType) =>
                      acc + currentValue.offer,
                    0
                  )
                  .toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
              </span>
            </div>

            <div className="bg-zinc-300 w-[300px] h-[120px] p-3  rounded-md">
              <div className="flex justify-between items-start">
                <p className="text-zinc-600 text-lg font-semibold">
                  Pedidos (mês)
                </p>
                <NotepadText size={20} opacity={0.8} />
              </div>

              <span className="flex items-start mt-2 text-xl font-bold">
                {monthOrdersAmount?.monthOrdersAmount}
              </span>
            </div>

            <div className="bg-zinc-300 w-[300px] h-[120px] p-3  rounded-md">
              <div className="flex justify-between items-start">
                <p className="text-zinc-600 text-lg font-semibold">
                  Pedidos (dia)
                </p>
                <NotepadText size={20} opacity={0.8} />
              </div>

              <span className="flex items-start mt-2 text-xl font-bold">
                {todayOrdersAmount}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-4 items-end">
            <div className="flex items-center gap-4">
              <p className="text-base font-semibold">Período</p>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={"w-[300px] justify-start text-left font-normal"}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date?.from ? (
                      date.to ? (
                        <>
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {error ? (
              <div className="flex h-[240px] w-full flex-col items-center justify-center gap-0.5">
                <span className="text-sm text-muted-foreground">
                  O período escolhido não pode ser maior que 7 dias.
                </span>
                <Button variant="default" onClick={handleResetPeriod}>
                  Exibir resultados dos últimos 7 dias
                </Button>
              </div>
            ) : (
              <>
                {periodData.length > 0 ? (
                  <ResponsiveContainer width="100%" height={280}>
                    <LineChart data={periodData} style={{ fontSize: 12 }}>
                      <XAxis
                        dataKey="date"
                        stroke="#888888"
                        tickLine={false}
                        axisLine={false}
                        dy={16}
                      />

                      <YAxis
                        stroke="#888888"
                        tickLine={false}
                        axisLine={false}
                        width={80}
                        tickFormatter={(value: number) =>
                          value.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })
                        }
                      />

                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Line
                        type="linear"
                        strokeWidth={2}
                        dataKey="offer"
                        stroke={"red"}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                ) : loading ? (
                  <StaticsCartesianSkeleton />
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
