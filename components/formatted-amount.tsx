interface Props {
  amount: number;
}

export function FormattedAmount({ amount }: Props) {
  return new Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}
