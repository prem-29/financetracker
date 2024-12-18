function MyButton({ onClick }) {
    return (
        <button style={styles.buttonStyle} onClick={onClick}>
            Submit
        </button>
    )
}

const styles = {
    buttonStyle: {
        top: 10,
        height: 40,
        width: 120,
        backgroundColor: "#081c15",
        color: 'white',
        borderRadius: '10px',
        borderColor: 'rgb(43, 85, 3)'
    }
}
export default MyButton;