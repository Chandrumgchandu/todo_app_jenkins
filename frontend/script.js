async function getMessage() {
    const response = await fetch(
        "http://3.107.232.252:3000/api/message"
    );

    const data = await response.json();

    document.getElementById("result").innerText =
        data.message;
}
