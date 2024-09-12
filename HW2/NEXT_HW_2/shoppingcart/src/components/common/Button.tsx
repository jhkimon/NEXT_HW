export const Button = ({ children, onClick, ...rest }) => {
    return (
        <button
            type="button"
            onClick={onClick}
            className="font-sans font-normal text-[16px] leading-[160%] w-[110px] flex justify-center items-center whitespace-nowrap gap-[6px] rounded-[6px] p-[10px] cursor-pointer text-[#737373] border border-[#d6d6d6] bg-white hover:text-[#4a4a4a] hover:bg-[#f4f4f4] active:text-[#4a4a4a] active:bg-[#f4f4f4] disabled:text-[#b8b8b8] disabled:border-[#ebebeb] disabled:bg-[#f4f4f4]"
            {...rest}
        >
            {children}
        </button>
    );
};
