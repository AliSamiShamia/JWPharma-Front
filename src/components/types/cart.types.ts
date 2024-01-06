export type CartType = {
  id: number;
  product: ProductType;
  quantity: number;
  options: OptionType[];
};

type OptionType = {
  id: number;
  value: string;
};
