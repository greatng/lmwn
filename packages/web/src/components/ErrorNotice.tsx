const ErrorNotice = () => {
    const ERROR = 'Opps! Something went wrong.';

    return (
        <div data-testid="error-notice" className="flex-1 ">
            {ERROR}
        </div>
    );
};

export default ErrorNotice;

