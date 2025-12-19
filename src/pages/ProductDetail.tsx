import SimilarProducts from "../components/SimilarProducts";
import "../stylesheets/product.css";
import { useParams } from "react-router-dom";
import { ProductService } from "../services/productService";
import { useEffect, useState } from "react";
import { useUserStore } from "../Stores/userStore";
import Price from "../components/Price";
import CustomImage from "../components/CustomImage";

export default function ProductDetail() {
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState(null);
    const [similarProducts, setSimilarProducts] = useState([]);
    const account = useUserStore((state) => state.user);
    const addToCart = useUserStore((state) => state.addToCart);
    const addFavorite = useUserStore((state) => state.addFavorite);
    const removeFavorite = useUserStore((state) => state.removeFavorite);
    const updateAccount = useUserStore((state) => state.updateUser);
    const exists = account?.favorites?.some((fav) => fav.id === product?.id) ?? false;
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await ProductService.getProductById(Number(productId));
                setProduct(res);

                const allProducts = await ProductService.getAllProducts();

                const filtered = allProducts.filter(p => p.subcategory.id === res.subcategory.id).filter(p => p.id !== res.id);
                setSimilarProducts(filtered);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProduct();
    }, [productId]);

    const handleAddToCart = async () => {
        if (!account || !product) {
            alert("You must be logged in to add items to cart!");
            return;
        }

        try {
            await addToCart( product.id, quantity);
            alert("Added to cart!");
        } catch (err) {
            console.error(err);
            alert("Failed to add to cart!");
        }
    };

    const handleAddToFavorites = async () => {
        if (!account || !product) return;
        
        try {
            if (exists) {
                await removeFavorite(product.id);
            } else {
                await addFavorite(product.id);
            }
        } catch (err) {
            console.error(err);
            alert("failed to add to favorites!");
        }
    }

    if (!product) return <p>Loading...</p>

    return (
        <div>
            <div className="product-grid">
                {/* left block */}
                <div className="product-left">
                    <div className="product-header">
                        <h2 style={{flex: 1}}>{product.name}</h2>
                        <span className="price">in stock: {product.stock}</span>
                    </div>
                    {/* img here */}
                    <CustomImage imageSource={product.imageLink} imageAlt={product.name} imageClassName=""/>
                </div>

                {/* center block */}
                <div className="product-center">
                    <div className="product-cost">
                        <h2>{<Price basePrice={product.price} />}</h2>
                        {/* admin button to edit here */}
                        <button className="admin">Edit</button>
                    </div>
                    <p>{product.description || "No description available"}</p>

                    <div className="product-category">
                        <p>Category: {product.subcategory.category.name} {"->"} {product.subcategory.name}</p>
                        <div className="product-actions">
                            <input type="number" id="quantity" min="1" max={product.stock} onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, Number(e.target.value))))} required />
                            <button onClick={handleAddToCart} disabled={product.stock < 1 || quantity > product.stock}>{product.stock < 1 ? "Öut of stock": "Add to cart"}</button>
                            {/* maybe a saved button next to the add to cart button too? */}
                            <button type="button" onClick={handleAddToFavorites}>{exists ? "del fav" : "add fav"}</button>
                        </div>
                    </div>
                </div>

                {/* right block */}
                <div className="product-right">
                    <h1>Similar products:</h1>
                    <SimilarProducts products={similarProducts} currentProduct={product}/>
                </div>
            </div>
        </div>
    );
}