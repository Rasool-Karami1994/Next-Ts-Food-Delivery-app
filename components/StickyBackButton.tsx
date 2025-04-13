import Link from "next/link";
interface StickyBackButtonProps {
  href: string;
}
const StickyBackButton = (props: StickyBackButtonProps) => {
  const { href } = props;
  return (
    <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
      <Link
        href={href}
        className="flex items-center justify-center px-4 py-3 w-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-800 dark:text-white absolute right-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
        <span className="text-lg font-semibold text-gray-800 dark:text-white">
          ادامه خرید
        </span>
      </Link>
    </div>
  );
};

export default StickyBackButton;
