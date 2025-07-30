export const BRAND_NAME = "Tostões";

export const routes = {
  signIn: {
    name: "Iniciar sessão",
    url: "/login",
  },
  signUp: {
    name: "Registar",
    url: "/register",
  },
  forgotPassword: {
    name: "Recuperar password",
    url: "/forgot-password",
  },
  updatePassword: {
    name: "Atualizar password",
    url: "/update-password",
  },
  dashboard: {
    name: "Resumo",
    url: "/dashboard",
  },
  income: {
    name: "Rendimentos",
    url: "/dashboard/income",
  },
  expenses: {
    name: "Despesas",
    url: "/dashboard/expenses",
  },
  transactions: {
    name: "Transações",
    url: "/dashboard/transactions",
  },
  netWorth: {
    name: "Património",
    url: "/dashboard/net-worth",
  },
  investments: {
    name: "Investimentos",
    url: "/dashboard/investments",
  },
  account: {
    name: "Conta",
    url: "/dashboard/account",
  },
} as const;

export const EXPENSE_RECURRENCES = ["monthly", "annual", "one-time"] as const;

export const EXPENSE_STATUSES = [
  "active",
  "inactive",
  "paid",
  "pending",
  "cancelled",
] as const;

export const RECURRING_EXPENSE_OPTIONS = ["monthly", "annual"] as const;

export const RECURRING_EXPENSE_STATUSES = [
  "active",
  "inactive",
  "cancelled",
] as const;

export const ONE_TIME_EXPENSE_OPTIONS = ["one_time"] as const;

export const ONE_TIME_EXPENSE_STATUSES = [
  "paid",
  "pending",
  "cancelled",
] as const;
