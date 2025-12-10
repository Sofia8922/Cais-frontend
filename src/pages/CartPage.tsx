import { data } from "../components/Data";
import Navbar from "../components/Navbar";
import Price from "../components/Price";

export default function CartPage() {
    
        const product = data[2];


    return (
        <div className="mainDiv">
            <Navbar />



            <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{
                    flex: 1, display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    padding: "20px"
                }}>
                    <div className="productDiv"
                        //key={product.id}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = "rgba(20, 20, 20, 1)";
                            const image = e.currentTarget.querySelector(".productImage") as HTMLElement;
                            if (image) {
                                image.style.filter = "hue-rotate(5deg) saturate(1) brightness(0.9)";
                                image.style.background = "rgba(0, 0, 0, 1)"
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(25, 25, 25, 1)";
                            const image = e.currentTarget.querySelector(".productImage") as HTMLElement;
                            if (image) {
                                image.style.filter = "hue-rotate(0deg) saturate(1) brightness(1)";
                                image.style.background = "rgba(15, 15, 15, 1)"
                            }
                        }}
                        onClick={() => { /*navigate(`/projects/${project.id}`)*/ }}
                    >
                        <img src={product.imageLink || "/placeholder.png"} alt={product.name}
                            className="productImage"
                        />
                        <div style={{ height: "50px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <strong style={{ fontSize: "30px", textAlign: "center", padding: "16px", }}>productName</strong>

                            <strong style={{ fontSize: "30px", textAlign: "center", padding: "16px", }}><Price basePrice={9} /></strong>

                        </div>
                    </div>

                    {/* can remove down here lol */}
                     <div className="productDiv"
                        //key={product.id}
                        onMouseOver={(e) => {
                            e.currentTarget.style.background = "rgba(20, 20, 20, 1)";
                            const image = e.currentTarget.querySelector(".productImage") as HTMLElement;
                            if (image) {
                                image.style.filter = "hue-rotate(5deg) saturate(1) brightness(0.9)";
                                image.style.background = "rgba(0, 0, 0, 1)"
                            }
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = "rgba(25, 25, 25, 1)";
                            const image = e.currentTarget.querySelector(".productImage") as HTMLElement;
                            if (image) {
                                image.style.filter = "hue-rotate(0deg) saturate(1) brightness(1)";
                                image.style.background = "rgba(15, 15, 15, 1)"
                            }
                        }}
                        onClick={() => { /*navigate(`/projects/${project.id}`)*/ }}
                    >
                        <img src={product.imageLink || "/placeholder.png"} alt={product.name}
                            className="productImage"
                        />
                        <div style={{ height: "50px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <strong style={{ fontSize: "30px", textAlign: "center", padding: "16px", }}>productName</strong>

                            <strong style={{ fontSize: "30px", textAlign: "center", padding: "16px", }}><Price basePrice={0.3} /></strong>

                        </div>
                    </div>





                </div>
            </div>
        </div>
    );
}