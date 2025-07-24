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
    name: "Dashboard",
    url: "/dashboard",
  },
  budget: {
    name: "Budget",
    url: "/dashboard/budget",
  },
  expenses: {
    name: "Despesas",
    url: "/dashboard/expenses",
  },
  assets: {
    name: "Ativos",
    url: "/dashboard/assets",
  },
  liabilities: {
    name: "Passivos",
    url: "/dashboard/liabilities",
  },
  investments: {
    name: "Investimentos",
    url: "/dashboard/investments",
  },
  netWorth: {
    name: "Património líquido",
    url: "/dashboard/net-worth",
  },
  account: {
    name: "Conta",
    url: "/dashboard/account",
  },
} as const;
