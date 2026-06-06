async function getMessage() {
    try {
        const response = await fetch("/api/message");
        const data = await response.json();

        document.getElementById("result").innerText =
            data.message;
    } catch (err) {
        document.getElementById("result").innerText =
            "Error connecting to backend";
        console.error(err);
    }
}
