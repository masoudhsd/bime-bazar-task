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
      <button className={`bg-${bgColor}  p-4 font-semibold `} onClick={onClick}>
        <p className={`text-${textColor}`}>{text}</p>
      </button>
    </div>
  );
}
