import Image from "next/image";
import React from "react";

interface CategoryCardProps {
  category: { id: string; title: string; image: string };
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      onClick={() => onSelect(category.id)}
      className={`cursor-pointer overflow-hidden rounded-lg relative border-2 hover:scale-105 hover:rotate-3 transition-transform duration-300 ${
        isSelected ? "border-gray-500" : "border-transparent"
      }`}
    >
      <Image
        src={category.image}
        alt={category.title}
        width={227}
        height={127}
        className="w-full h-32 object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
        <span className="text-white font-semibold">{category.title}</span>
      </div>
    </div>
  );
};

export default React.memo(CategoryCard);
