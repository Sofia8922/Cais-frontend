import { PurchaseDTOList} from "../dtos/PurchaseDTOs";
import PriceFormat from "./PriceFormat";
import "../stylesheets/profile.css";
import CustomImage from "./CustomImage";

interface RecentOrdersProps {
  orders: PurchaseDTOList;
}

export default function RecentOrders({orders}: RecentOrdersProps) {


    if (!orders) {
        return <p>Loading orders...</p>;
    }

    if (orders.length === 0) {
        return <p>No recent orders.</p>
    }

    return (
        <div className="order-container">
            

            {orders.map((order) => (
                <p key={order.id} className="order-card">
                    <hr/>
                    <CustomImage imageSource={order.productDTO.imageLink} 
                        imageAlt={order.productDTO.name} 
                        imageClassName="product-image" 
                        greyedOut={order.productDTO.stock === 0}/>
                        
                    <p className="card-info"><strong>Purchase:</strong> {order.productDTO.name ?? "Unknown Product"} × {order.amount}</p>
                    <p className="card-info"><strong>Total price:</strong> <PriceFormat priceNumber={((order.productDTO.price) * (order.amount))}/></p>
                    <p className="card-info"><strong>Status:</strong> {order.status}</p>
                </p>
            ))}
        </div>
    )
}