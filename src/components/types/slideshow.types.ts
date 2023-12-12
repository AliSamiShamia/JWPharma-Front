type ActionType = {
  slug: string; //slug
  type: string; //Product,category,...
};
export type SlideShowType = {
  title?: string;
  subtitle?: string;
  url: string;
  action?: ActionType;
};
