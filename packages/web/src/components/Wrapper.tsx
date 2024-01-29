export const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex flex-col w-full justify-start items-center">
            {children}
        </div>
    );
};

