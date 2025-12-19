import { PurchaseDTOList} from "../dtos/PurchaseDTOs";

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
        <div className="recent-orders">
            <h2>Recent Orders</h2>

            {orders.map((order) => (
                <p key={order.id} className="order-card">
                    <p><strong>Purchase:</strong> {order.productDTO.name ?? "Unknown Product"} × {order.amount}</p>
                    <p><strong>Total price:</strong> €{ ((order.productDTO.price) * (order.amount)).toFixed(2).replace('.', ',')}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <hr/>
                </p>
            ))}
        </div>
    )
}