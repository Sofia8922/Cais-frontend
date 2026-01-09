interface PriceProps {
    priceNumber: number
}

const PriceFormat = ({priceNumber}: PriceProps) => {
    return (
        <div className="prices">€{priceNumber.toFixed(2).replace('.', ',')}</div>
    );
};

export default PriceFormat;