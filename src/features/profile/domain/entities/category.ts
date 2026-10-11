export type CategoryKind = 'expense' | 'income';

export type CategoryIconKey =
  | 'utensils'
  | 'shopping-cart'
  | 'car'
  | 'shirt'
  | 'zap'
  | 'heart-pulse'
  | 'home'
  | 'clapperboard'
  | 'plane'
  | 'graduation-cap'
  | 'repeat'
  | 'circle-ellipsis'
  | 'briefcase'
  | 'laptop'
  | 'arrow-left-right'
  | 'trending-up'
  | 'rotate-ccw'
  | 'plus-circle';

export type Category = {
  id: string;
  kind: CategoryKind;
  name: string;
  iconKey: CategoryIconKey;
  iconBg: string;
  metaLabel: string;
};

export type CategoriesSnapshot = {
  categories: Category[];
  smartSuggestionsEnabled: boolean;
};
