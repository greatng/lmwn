const HeroImage = ({ src }: { src: string }) => {
    return (
        <div
            className="h-1/4 lg:h-1/3 sm:h-1/4 bg-cover bg-center min-h-[25dvh] w-full"
            style={{ backgroundImage: `url(${src})` }}
        ></div>
    );
};

export default HeroImage;

