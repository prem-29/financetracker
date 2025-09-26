import { FaComments } from "react-icons/fa";

function ChatIconButton({ onClick }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
            <button
                onClick={onClick}
                style={{
                    position: "fixed",   // ✅ keep it fixed
                    bottom: "20px",      // distance from bottom
                    // right: "8px",       // distance from right
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    background: "#2D6A4F",
                    color: "white",
                    fontSize: "28px",
                    border: "none",
                    cursor: "pointer",
                    // boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                    zIndex: 1000         // ✅ make sure it’s above other elements
                }}
            >
                <FaComments />
            </button>
        </div>
    );
}

export default ChatIconButton;
