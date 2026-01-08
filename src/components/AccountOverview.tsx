import AccountOverviewComponent from "./AccountOverviewComponent";

export default function AccountOverview({ closeFunction }: { closeFunction: () => void }) { 
    return ( 
            <div style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                background: "rgba(0,0,0,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 99
            }}
                onClick={closeFunction}>
                <div style={{
                    width: "1200px",
                    height: "700px",
                    background: "black",
                    border: "2px solid white",
                    borderRadius: "10px",
                    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                }} onClick={e => e.stopPropagation()}>
                <AccountOverviewComponent/>
            </div>
        </div >
    )
}