interface PriceProps {
    priceNumber: number
}

const PriceFormat = ({priceNumber}: PriceProps) => {
    return (
        <>€{priceNumber.toFixed(2).replace('.', ',')}</>
    );
};

export default PriceFormat;