interface ButtonProps {
  text: string;
  onClick: () => void;
  isLoading: boolean;
  bgColor: string;
  textColor: string;
  classes?: string;
}
export default function ConfirmButton({
  text,
  onClick,
  isLoading,
  textColor,
  bgColor,
  classes,
}: ButtonProps) {
  return (
    <div className={`${classes}`}>
      <button
        className={`${bgColor} p-4 font-semibold w-full`}
        onClick={onClick}
      >
        <p className={`${textColor}`}>{text}</p>
      </button>
    </div>
  );
}
