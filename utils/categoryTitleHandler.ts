export const categoryTitleHandler = (title: string) => {
  switch (title) {
    case "appetizer":
      return "پیش غذا";
    case "dessert":
      return "دسر";
    case "persian":
      return "غذاایرانی";
    case "fastfood":
      return "فست فود";
    case "drink":
      return "نوشیدنی";
    case "favorites":
      return "علاقه مندی ها";

    default:
      break;
  }
};
