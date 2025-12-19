interface PriceProps {
    basePrice: number
}

const Price = ({basePrice}: PriceProps) => {
    const highPrice = 
        (basePrice * 1.4).toFixed(2).replace('.', ',');

    const lowPrice =
        basePrice.toFixed(2).replace('.', ',');

    return (
        <>
            <>€{lowPrice}</> <s>€{highPrice}</s>
        </>
    );
};

export default Price;