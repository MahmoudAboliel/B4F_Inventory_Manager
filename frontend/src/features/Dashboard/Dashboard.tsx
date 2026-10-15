import { useMemo } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

/* ============================ Types ============================ */

export interface Product {
  id: string;
  name: string;
  quantity: number;
  minimumQuantity: number;
  imageUrl: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt: string | Date | null;
}

export interface Movement {
  id: string;
  productId: {
    id: string;
    name: string;
  };
  type: "in" | "out";
  amount: number;
  date: string | Date;
  note?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

/* ============================ Dummy Data ============================ */

const daysAgo = (n: number, hour = 10) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
};

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Dell XPS 15 Laptop",
    quantity: 24,
    minimumQuantity: 10,
    imageUrl: "",
    createdAt: daysAgo(90),
    updatedAt: daysAgo(2),
    deletedAt: null,
  },
  {
    id: "p2",
    name: "Logitech Wireless Mouse",
    quantity: 6,
    minimumQuantity: 15,
    imageUrl: "",
    createdAt: daysAgo(80),
    updatedAt: daysAgo(1),
    deletedAt: null,
  },
  {
    id: "p3",
    name: "Mechanical Keyboard",
    quantity: 42,
    minimumQuantity: 12,
    imageUrl: "",
    createdAt: daysAgo(70),
    updatedAt: daysAgo(3),
    deletedAt: null,
  },
  {
    id: "p4",
    name: 'Samsung 27" Monitor',
    quantity: 8,
    minimumQuantity: 10,
    imageUrl: "",
    createdAt: daysAgo(65),
    updatedAt: daysAgo(4),
    deletedAt: null,
  },
  {
    id: "p5",
    name: "Sony WH-1000 Headphones",
    quantity: 31,
    minimumQuantity: 8,
    imageUrl: "",
    createdAt: daysAgo(60),
    updatedAt: daysAgo(5),
    deletedAt: null,
  },
  {
    id: "p6",
    name: "2TB External Hard Drive",
    quantity: 3,
    minimumQuantity: 12,
    imageUrl: "",
    createdAt: daysAgo(55),
    updatedAt: daysAgo(1),
    deletedAt: null,
  },
  {
    id: "p7",
    name: "Logitech 4K Webcam",
    quantity: 19,
    minimumQuantity: 6,
    imageUrl: "",
    createdAt: daysAgo(50),
    updatedAt: daysAgo(6),
    deletedAt: null,
  },
  {
    id: "p8",
    name: "TP-Link AX3000 Router",
    quantity: 11,
    minimumQuantity: 10,
    imageUrl: "",
    createdAt: daysAgo(45),
    updatedAt: daysAgo(2),
    deletedAt: null,
  },
  {
    id: "p9",
    name: "Apple Magic Keyboard",
    quantity: 27,
    minimumQuantity: 9,
    imageUrl: "",
    createdAt: daysAgo(40),
    updatedAt: daysAgo(7),
    deletedAt: null,
  },
  {
    id: "p10",
    name: "Anker 65W Charger",
    quantity: 5,
    minimumQuantity: 20,
    imageUrl: "",
    createdAt: daysAgo(30),
    updatedAt: daysAgo(1),
    deletedAt: null,
  },
];

const MOVEMENTS: Movement[] = [
  {
    id: "m1",
    productId: { id: "p1", name: "Dell XPS 15 Laptop" },
    type: "in",
    amount: 15,
    date: daysAgo(0, 9),
    note: "Received from supplier",
    createdAt: daysAgo(0, 9),
    updatedAt: daysAgo(0, 9),
  },
  {
    id: "m2",
    productId: { id: "p2", name: "Logitech Wireless Mouse" },
    type: "out",
    amount: 8,
    date: daysAgo(0, 11),
    note: "Customer order #1024",
    createdAt: daysAgo(0, 11),
    updatedAt: daysAgo(0, 11),
  },
  {
    id: "m3",
    productId: { id: "p5", name: "Sony WH-1000 Headphones" },
    type: "out",
    amount: 5,
    date: daysAgo(0, 14),
    note: "Customer order #1025",
    createdAt: daysAgo(0, 14),
    updatedAt: daysAgo(0, 14),
  },
  {
    id: "m4",
    productId: { id: "p3", name: "Mechanical Keyboard" },
    type: "in",
    amount: 20,
    date: daysAgo(1, 10),
    note: "New supply",
    createdAt: daysAgo(1, 10),
    updatedAt: daysAgo(1, 10),
  },
  {
    id: "m5",
    productId: { id: "p6", name: "2TB External Hard Drive" },
    type: "out",
    amount: 12,
    date: daysAgo(1, 13),
    note: "Wholesale order",
    createdAt: daysAgo(1, 13),
    updatedAt: daysAgo(1, 13),
  },
  {
    id: "m6",
    productId: { id: "p4", name: 'Samsung 27" Monitor' },
    type: "out",
    amount: 6,
    date: daysAgo(1, 16),
    note: "Maintenance/Replacement",
    createdAt: daysAgo(1, 16),
    updatedAt: daysAgo(1, 16),
  },
  {
    id: "m7",
    productId: { id: "p7", name: "Logitech 4K Webcam" },
    type: "in",
    amount: 25,
    date: daysAgo(2, 9),
    note: "Received from supplier",
    createdAt: daysAgo(2, 9),
    updatedAt: daysAgo(2, 9),
  },
  {
    id: "m8",
    productId: { id: "p10", name: "Anker 65W Charger" },
    type: "out",
    amount: 18,
    date: daysAgo(2, 12),
    note: "Customer order #1019",
    createdAt: daysAgo(2, 12),
    updatedAt: daysAgo(2, 12),
  },
  {
    id: "m9",
    productId: { id: "p1", name: "Dell XPS 15 Laptop" },
    type: "out",
    amount: 4,
    date: daysAgo(2, 15),
    note: "Customer order #1020",
    createdAt: daysAgo(2, 15),
    updatedAt: daysAgo(2, 15),
  },
  {
    id: "m10",
    productId: { id: "p9", name: "Apple Magic Keyboard" },
    type: "in",
    amount: 30,
    date: daysAgo(3, 10),
    note: "New supply",
    createdAt: daysAgo(3, 10),
    updatedAt: daysAgo(3, 10),
  },
  {
    id: "m11",
    productId: { id: "p8", name: "TP-Link AX3000 Router" },
    type: "out",
    amount: 7,
    date: daysAgo(3, 13),
    note: "Customer order #1015",
    createdAt: daysAgo(3, 13),
    updatedAt: daysAgo(3, 13),
  },
  {
    id: "m12",
    productId: { id: "p2", name: "Logitech Wireless Mouse" },
    type: "in",
    amount: 10,
    date: daysAgo(3, 17),
    note: "Return from customer",
    createdAt: daysAgo(3, 17),
    updatedAt: daysAgo(3, 17),
  },
  {
    id: "m13",
    productId: { id: "p5", name: "Sony WH-1000 Headphones" },
    type: "in",
    amount: 22,
    date: daysAgo(4, 9),
    note: "Received from supplier",
    createdAt: daysAgo(4, 9),
    updatedAt: daysAgo(4, 9),
  },
  {
    id: "m14",
    productId: { id: "p3", name: "Mechanical Keyboard" },
    type: "out",
    amount: 14,
    date: daysAgo(4, 12),
    note: "Wholesale order",
    createdAt: daysAgo(4, 12),
    updatedAt: daysAgo(4, 12),
  },
  {
    id: "m15",
    productId: { id: "p10", name: "Anker 65W Charger" },
    type: "in",
    amount: 40,
    date: daysAgo(4, 16),
    note: "New supply",
    createdAt: daysAgo(4, 16),
    updatedAt: daysAgo(4, 16),
  },
  {
    id: "m16",
    productId: { id: "p4", name: 'Samsung 27" Monitor' },
    type: "in",
    amount: 12,
    date: daysAgo(5, 10),
    note: "Received from supplier",
    createdAt: daysAgo(5, 10),
    updatedAt: daysAgo(5, 10),
  },
  {
    id: "m17",
    productId: { id: "p6", name: "2TB External Hard Drive" },
    type: "out",
    amount: 9,
    date: daysAgo(5, 14),
    note: "Customer order #1009",
    createdAt: daysAgo(5, 14),
    updatedAt: daysAgo(5, 14),
  },
  {
    id: "m18",
    productId: { id: "p7", name: "Logitech 4K Webcam" },
    type: "out",
    amount: 6,
    date: daysAgo(5, 18),
    note: "Customer order #1010",
    createdAt: daysAgo(5, 18),
    updatedAt: daysAgo(5, 18),
  },
  {
    id: "m19",
    productId: { id: "p1", name: "Dell XPS 15 Laptop" },
    type: "out",
    amount: 3,
    date: daysAgo(6, 11),
    note: "Customer order #1005",
    createdAt: daysAgo(6, 11),
    updatedAt: daysAgo(6, 11),
  },
  {
    id: "m20",
    productId: { id: "p8", name: "TP-Link AX3000 Router" },
    type: "in",
    amount: 18,
    date: daysAgo(6, 15),
    note: "New supply",
    createdAt: daysAgo(6, 15),
    updatedAt: daysAgo(6, 15),
  },
];

/* ============================ Chart Colors ============================ */

const COLORS = {
  in: "#10b981",
  out: "#ef4444",
  accent: "#6366f1",
  amber: "#f59e0b",
};

const PIE_COLORS = [COLORS.in, COLORS.out];

/* ============================ Helpers ============================ */

const nf = new Intl.NumberFormat("en-US");

const toDate = (d: string | Date) => (d instanceof Date ? d : new Date(d));

const dayKey = (d: string | Date) => {
  const date = toDate(d);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
};

const formatDate = (d: string | Date) =>
  toDate(d).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const formatTime = (d: string | Date) =>
  toDate(d).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

/* ============================ Icons ============================ */

const Icon = ({
  path,
  className = "w-5 h-5",
}: {
  path: string;
  className?: string;
}) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={path} />
  </svg>
);

const icons = {
  box: "M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z",
  alert:
    "M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z M12 9v4 M12 17h.01",
  arrowDown: "M12 5v14 M19 12l-7 7-7-7",
  arrowUp: "M12 19V5 M5 12l7-7 7 7",
  activity: "M22 12h-4l-3 9L9 3l-3 9H2",
};

/* ============================ StatCard ============================ */

interface StatCardProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: string;
  tone: "indigo" | "red" | "emerald" | "amber";
}

const toneMap = {
  indigo: {
    bg: "bg-indigo-500/10",
    text: "text-indigo-400",
    ring: "ring-indigo-500/20",
    bar: "from-indigo-500 to-indigo-400",
  },
  red: {
    bg: "bg-red-500/10",
    text: "text-red-400",
    ring: "ring-red-500/20",
    bar: "from-red-500 to-red-400",
  },
  emerald: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    ring: "ring-emerald-500/20",
    bar: "from-emerald-500 to-emerald-400",
  },
  amber: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    ring: "ring-amber-500/20",
    bar: "from-amber-500 to-amber-400",
  },
};

function StatCard({ title, value, subtitle, icon, tone }: StatCardProps) {
  const t = toneMap[tone];
  return (
    <div className="relative overflow-hidden rounded-2xl bg-slate-800 p-5 shadow-lg shadow-slate-900/30 ring-1 ring-slate-700 transition hover:shadow-xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-400">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-100">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
          )}
        </div>
        <div
          className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ring-1 ${t.bg} ${t.text} ${t.ring}`}
        >
          <Icon path={icon} />
        </div>
      </div>
      <div
        className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-l ${t.bar}`}
      />
    </div>
  );
}

/* ============================ Page ============================ */

export default function DashboardPage() {
  /* ---------- Stats ---------- */
  const stats = useMemo(() => {
    const activeProducts = PRODUCTS.filter((p) => !p.deletedAt);
    const lowStock = activeProducts.filter(
      (p) => p.quantity <= p.minimumQuantity,
    );
    const totalIn = MOVEMENTS.filter((m) => m.type === "in").reduce(
      (s, m) => s + m.amount,
      0,
    );
    const totalOut = MOVEMENTS.filter((m) => m.type === "out").reduce(
      (s, m) => s + m.amount,
      0,
    );
    const totalStock = activeProducts.reduce((s, p) => s + p.quantity, 0);

    return {
      productsCount: activeProducts.length,
      lowStockCount: lowStock.length,
      totalIn,
      totalOut,
      totalStock,
      net: totalIn - totalOut,
      lowStock,
    };
  }, []);

  /* ---------- Last 7 Days Trend ---------- */
  const trendData = useMemo(() => {
    const days = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      d.setHours(0, 0, 0, 0);
      return d;
    });

    return days.map((d) => {
      const key = dayKey(d);
      const dayMovements = MOVEMENTS.filter((m) => dayKey(m.date) === key);
      const inQty = dayMovements
        .filter((m) => m.type === "in")
        .reduce((s, m) => s + m.amount, 0);
      const outQty = dayMovements
        .filter((m) => m.type === "out")
        .reduce((s, m) => s + m.amount, 0);
      return {
        day: d.toLocaleDateString("en-US", { weekday: "short" }),
        fullDate: formatDate(d),
        Inbound: inQty,
        Outbound: outQty,
        Net: inQty - outQty,
      };
    });
  }, []);

  /* ---------- Pie Data ---------- */
  const pieData = useMemo(
    () => [
      { name: "Inbound", value: stats.totalIn },
      { name: "Outbound", value: stats.totalOut },
    ],
    [stats.totalIn, stats.totalOut],
  );

  /* ---------- Top Moving Products ---------- */
  const topProductsData = useMemo(() => {
    const map = new Map<
      string,
      { name: string; Inbound: number; Outbound: number; total: number }
    >();

    MOVEMENTS.forEach((m) => {
      const key = m.productId.id;
      const entry = map.get(key) ?? {
        name: m.productId.name,
        Inbound: 0,
        Outbound: 0,
        total: 0,
      };
      if (m.type === "in") entry.Inbound += m.amount;
      else entry.Outbound += m.amount;
      entry.total += m.amount;
      map.set(key, entry);
    });

    return Array.from(map.values())
      .sort((a, b) => b.total - a.total)
      .slice(0, 5)
      .map((p) => ({
        ...p,
        shortName: p.name.length > 16 ? p.name.slice(0, 16) + "…" : p.name,
      }));
  }, []);

  /* ---------- Recent Movements ---------- */
  const recentMovements = useMemo(
    () =>
      [...MOVEMENTS]
        .sort((a, b) => toDate(b.date).getTime() - toDate(a.date).getTime())
        .slice(0, 6),
    [],
  );

  return (
    <div dir="ltr" className="">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* ============ Header ============ */}
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 sm:text-3xl">
              Dashboard
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Inventory and warehouse movements overview — last updated{" "}
              {formatDate(new Date())}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 shadow-sm ring-1 ring-slate-700">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              Synced
            </span>
          </div>
        </header>

        {/* ============ Stat Cards ============ */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard
            title="Total Products"
            value={nf.format(stats.productsCount)}
            subtitle={`Total items in stock: ${nf.format(stats.totalStock)}`}
            icon={icons.box}
            tone="indigo"
          />
          <StatCard
            title="Low Stock Products"
            value={nf.format(stats.lowStockCount)}
            subtitle="Needs restocking"
            icon={icons.alert}
            tone="red"
          />
          <StatCard
            title="Total Inbound"
            value={nf.format(stats.totalIn)}
            subtitle="units in last 7 days"
            icon={icons.arrowDown}
            tone="emerald"
          />
          <StatCard
            title="Total Outbound"
            value={nf.format(stats.totalOut)}
            subtitle="units in last 7 days"
            icon={icons.arrowUp}
            tone="amber"
          />
        </section>

        {/* ============ Charts ============ */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Trend Chart */}
          <div className="rounded-2xl bg-slate-800 p-5 shadow-lg shadow-slate-900/30 ring-1 ring-slate-700 lg:col-span-2">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-slate-100">
                  Inventory Movement
                </h2>
                <p className="text-xs text-slate-500">
                  Inbound and outbound over the last 7 days
                </p>
              </div>
              <div className="hidden items-center gap-3 text-xs sm:flex">
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: COLORS.in }}
                  />
                  Inbound
                </span>
                <span className="flex items-center gap-1.5 text-slate-400">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: COLORS.out }}
                  />
                  Outbound
                </span>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={trendData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="gradIn" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={COLORS.in}
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="95%"
                        stopColor={COLORS.in}
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient id="gradOut" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor={COLORS.out}
                        stopOpacity={0.35}
                      />
                      <stop
                        offset="95%"
                        stopColor={COLORS.out}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #334155",
                      background: "#1e293b",
                      color: "#e2e8f0",
                      boxShadow: "0 8px 24px rgba(0,0,0,.4)",
                      fontSize: 13,
                    }}
                    labelStyle={{ fontWeight: 600, color: "#cbd5e1" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Inbound"
                    stroke={COLORS.in}
                    strokeWidth={2.5}
                    fill="url(#gradIn)"
                    dot={{ r: 3, fill: COLORS.in }}
                    activeDot={{ r: 5 }}
                  />
                  <Area
                    type="monotone"
                    dataKey="Outbound"
                    stroke={COLORS.out}
                    strokeWidth={2.5}
                    fill="url(#gradOut)"
                    dot={{ r: 3, fill: COLORS.out }}
                    activeDot={{ r: 5 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="rounded-2xl bg-slate-800 p-5 shadow-lg shadow-slate-900/30 ring-1 ring-slate-700">
            <h2 className="text-base font-semibold text-slate-100">
              Inbound vs Outbound Ratio
            </h2>
            <p className="text-xs text-slate-500">Total recorded movements</p>

            <div className="mt-2 h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    stroke="none"
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #334155",
                      background: "#1e293b",
                      color: "#e2e8f0",
                      fontSize: 13,
                    }}
                  />
                  <Legend
                    verticalAlign="bottom"
                    iconType="circle"
                    formatter={(v) => (
                      <span className="text-sm text-slate-300">{v}</span>
                    )}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-3 border-t border-slate-700 pt-4">
              <div className="text-center">
                <p className="text-xs text-slate-500">Net Movement</p>
                <p
                  className={`text-lg font-bold ${
                    stats.net >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {stats.net >= 0 ? "+" : ""}
                  {nf.format(stats.net)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500">Total Movements</p>
                <p className="text-lg font-bold text-slate-200">
                  {nf.format(MOVEMENTS.length)}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ============ Top Products + Recent Movements ============ */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Top Moving Products */}
          <div className="rounded-2xl bg-slate-800 p-5 shadow-lg shadow-slate-900/30 ring-1 ring-slate-700 lg:col-span-2">
            <h2 className="text-base font-semibold text-slate-100">
              Top Moving Products
            </h2>
            <p className="text-xs text-slate-500">
              Top 5 products by total quantity
            </p>
            <div className="mt-4 h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topProductsData}
                  layout="vertical"
                  margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                  barSize={14}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#334155"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="shortName"
                    width={120}
                    tick={{ fontSize: 12, fill: "#94a3b8" }}
                    axisLine={false}
                    tickLine={false}
                    orientation="left"
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: "1px solid #334155",
                      background: "#1e293b",
                      color: "#e2e8f0",
                      fontSize: 13,
                    }}
                  />
                  <Legend
                    iconType="circle"
                    formatter={(v) => (
                      <span className="text-sm text-slate-300">{v}</span>
                    )}
                  />
                  <Bar
                    dataKey="Inbound"
                    fill={COLORS.in}
                    radius={[6, 6, 6, 6]}
                  />
                  <Bar
                    dataKey="Outbound"
                    fill={COLORS.out}
                    radius={[6, 6, 6, 6]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Movements */}
          <div className="rounded-2xl bg-slate-800 p-5 shadow-lg shadow-slate-900/30 ring-1 ring-slate-700">
            <div className="flex items-center gap-2">
              <Icon path={icons.activity} className="h-5 w-5 text-indigo-400" />
              <h2 className="text-base font-semibold text-slate-100">
                Recent Movements
              </h2>
            </div>

            <ul className="mt-4 space-y-3">
              {recentMovements.map((m) => {
                const isIn = m.type === "in";
                return (
                  <li
                    key={m.id}
                    className="flex items-start gap-3 rounded-xl p-3 transition hover:bg-slate-700/50"
                  >
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-lg ${
                        isIn
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      <Icon
                        path={isIn ? icons.arrowDown : icons.arrowUp}
                        className="h-4 w-4"
                      />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium text-slate-200">
                        {m.productId.name}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {m.note ?? "No notes"}
                      </p>
                      <p className="mt-1 text-[11px] text-slate-500">
                        {formatDate(m.date)} · {formatTime(m.date)}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 rounded-lg px-2 py-1 text-xs font-bold ${
                        isIn
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-red-500/10 text-red-400"
                      }`}
                    >
                      {isIn ? "+" : "−"}
                      {m.amount}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ============ Low Stock Table ============ */}
        <section className="rounded-2xl bg-slate-800 p-5 shadow-lg shadow-slate-900/30 ring-1 ring-slate-700">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-slate-100">
                Low Stock Alerts
              </h2>
              <p className="text-xs text-slate-500">
                Products at or below minimum threshold
              </p>
            </div>
            <span className="rounded-full bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-400">
              {nf.format(stats.lowStockCount)} products
            </span>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b border-slate-700 text-xs uppercase tracking-wide text-slate-500">
                  <th className="pb-3 pl-2 font-medium">Product</th>
                  <th className="pb-3 font-medium">Current Qty</th>
                  <th className="pb-3 font-medium">Min Qty</th>
                  <th className="pb-3 font-medium">Stock Level</th>
                  <th className="pb-3 pr-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/60">
                {stats.lowStock.map((p) => {
                  const ratio = Math.min(
                    100,
                    Math.round(
                      (p.quantity / Math.max(p.minimumQuantity, 1)) * 100,
                    ),
                  );
                  const critical = p.quantity <= p.minimumQuantity / 2;
                  return (
                    <tr
                      key={p.id}
                      className="text-sm transition hover:bg-slate-700/40"
                    >
                      <td className="py-3 pl-2">
                        <div className="flex items-center gap-3">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-400 text-xs font-bold text-white">
                            {p.name.charAt(0)}
                          </span>
                          <span className="font-medium text-slate-200">
                            {p.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 font-semibold text-slate-200">
                        {nf.format(p.quantity)}
                      </td>
                      <td className="py-3 text-slate-400">
                        {nf.format(p.minimumQuantity)}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-28 overflow-hidden rounded-full bg-slate-700">
                            <div
                              className={`h-full rounded-full ${
                                critical ? "bg-red-500" : "bg-amber-500"
                              }`}
                              style={{ width: `${ratio}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-500">
                            {ratio}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 pr-2">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                            critical
                              ? "bg-red-500/10 text-red-400"
                              : "bg-amber-500/10 text-amber-400"
                          }`}
                        >
                          {critical ? "Critical" : "Low"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
                {stats.lowStock.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="py-10 text-center text-sm text-slate-500"
                    >
                      No low stock products 🎉
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
