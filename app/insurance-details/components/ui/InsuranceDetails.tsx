const InsuranceDetails: React.FC = () => {
  return (
    <>
      <div className="flex items-center justify-around w-full px-12 mt-8">
        <p className="text-subTextGray whitespace-pre">شرکت بیمه گر</p>
        <div className="border-b-[1px] border-dotted border-gray-300 w-full mx-1"></div>
        <p className="whitespace-pre">پارسیان</p>
      </div>
      <div className="flex items-center justify-around w-full px-12 my-4">
        <p className="text-subTextGray whitespace-pre">برند خودرو</p>
        <div className="border-b-[1px] border-dotted border-gray-300 w-full mx-1"></div>
        <p className="whitespace-pre">پژو</p>
      </div>
      <div className="flex items-center justify-around w-full px-12 my-2 mb-8">
        <p className="text-subTextGray whitespace-pre">مدل خودرو</p>
        <div className="border-b-[1px] border-dotted border-gray-300 w-full mx-1"></div>
        <p className="whitespace-pre">206 تیپ 6</p>
      </div>
    </>
  );
};

export default InsuranceDetails;
