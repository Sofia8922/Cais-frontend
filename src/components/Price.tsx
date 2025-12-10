interface PriceProps {
    basePrice: number
}

const Price = ({basePrice}: PriceProps) => {
    const highPrice = 
        (basePrice * 1.4).toFixed(2);

    const lowPrice =
        basePrice.toFixed(2);

    return (
        <>
            <>€{lowPrice.toString()}</> <s>€{highPrice.toString()}</s>
        </>
    );
};

export default Price;