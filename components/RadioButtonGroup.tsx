import { motion } from "framer-motion";

type RadioOption = {
  id: string;
  value: string;
  label: string;
};
type makedTimeType = {
  time: string;
  day: string;
};

interface RadioButtonGroup {
  selectedOption: makedTimeType;
  setSelectedOption: (item: makedTimeType) => void;
}
export default function RadioButtonGroup(props: RadioButtonGroup) {
  const options: RadioOption[] = [
    { id: "1", value: "از 11:30 تا 12:00", label: "از 11:30 تا 12:00" },
    { id: "2", value: "از 12:00 تا 12:30", label: "از 12:00 تا 12:30" },
    { id: "3", value: "از 12:30 تا 13:00", label: "از 12:30 تا 13:00" },
    { id: "3", value: "از 13:00 تا 13:30", label: "از 13:00 تا 13:30" },
  ];
  const { selectedOption, setSelectedOption } = props;
  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption({
      day: selectedOption?.day,
      time: e.target.value,
    });
  };

  return (
    <div className="flex w-full  flex-col justify-start items-start gap-3 md:flex-row md:justify-evenly md:items-center bg-white dark:bg-gray-700">
      {options.map((option, index) => (
        <motion.div
          key={option.id}
          initial={{ opacity: 0, x: 0 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: index * 0.05 }}
        >
          <div className="flex items-center">
            <input
              type="radio"
              id={option.id}
              name="radioGroup"
              value={option.value}
              checked={selectedOption?.time === option.value}
              onChange={handleOptionChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <label
              htmlFor={option.id}
              className="mx-2 block text-sm dark:text-white"
            >
              {option.label}
            </label>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
