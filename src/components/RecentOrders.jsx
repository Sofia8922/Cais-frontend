import { useEffect, useState } from "react";
import { useUserStore } from "../Stores/userStore";
import { AccountService } from "../services/accountService";


export default function RecentOrders({ orders }) {
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
                <div key={order.id} className="order-card">
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Product:</strong> {order.productDTO.name ?? "Unknown Product"}</p>
                    <p><strong>Quantity:</strong> {order.amount}</p>
                    <p><strong>Status:</strong> {order.status}</p>
                    <p><strong>Price:</strong> { ((order.unitPrice ?? 0) * (order.amount ?? 1).toFixed(2)) ?? "0.00"}</p>
                </div>
            ))}
        </div>
    )
}