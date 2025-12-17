import Navbar from "../components/Navbar";
import SimilarProducts from "../components/SimilarProducts";
import { data } from "../components/Data";
import "../stylesheets/product.css";
import { useParams } from "react-router-dom";
import { AccountService } from "../services/accountService";
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
        if (!account?.id) {
            alert("You must be logged in to add items to cart!");
            return;
        }
        try {
            await AccountService.addToCart(account?.id, product.id, quantity);
            alert("Added to cart!");
        } catch (err) {
            console.error(err);
            alert("Failed to add to cart!");
        }
    };

    const handleAddToFavorites = async () => {
        if (!account) return;
        
        try {
            if (exists) {
                await AccountService.removeFromFavorites(account.id, product.id);

                updateAccount({
                    favorites: account.favorites.filter((fav) => fav.id !== product.id),
                })
            } else {
                await AccountService.addToFavorites(account.id, product.id);

                updateAccount({
                    favorites: [...account?.favorites, product]
                })
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
                    <p>{product.description || "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}</p>

                    <div className="product-category">
                        <p>Category: {product.subcategory.category.name} {"->"} {product.subcategory.name}</p>
                        <div className="product-actions">
                            <input type="number" id="quantity" min="1" onChange={(e) => setQuantity(Number(e.target.value))} required />
                            <button onClick={handleAddToCart}>Add to cart</button>
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