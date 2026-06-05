async function getMessage() {
    const response = await fetch(
        "http://YOUR_EC2_PUBLIC_IP:3000/api/message"
    );

    const data = await response.json();

    document.getElementById("result").innerText =
        data.message;
}
