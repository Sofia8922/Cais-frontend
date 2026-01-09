import PriceFormat from "./PriceFormat";

interface PriceProps {
    basePrice: number
}

const Price = ({basePrice}: PriceProps) => {
    const highPrice = <PriceFormat priceNumber={basePrice * 1.4}/>

    const lowPrice = <PriceFormat priceNumber={basePrice}/>

    return (
        <>
            <s>{highPrice}</s> <>{lowPrice}</>
        </>
    );
};

export default Price;