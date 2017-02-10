// Note that the path doesn't matter right now; any WebSocket
// connection gets bumped over to WebSocket consumers

$('document').ready(function () {
    // window.location.pathname
    // Note that the path doesn't matter right now; any WebSocket
    // connection gets bumped over to WebSocket consumers
    socket = new ReconnectingWebSocket("ws://" + window.location.host + window.location.pathname);
    console.log("ws://" + window.location.host + window.location.pathname);
    socket.onmessage = function (e) {
        alert(e.data);
        $("textarea").append("\n" + e.data);
    }
    socket.onopen = function () {
        socket.send("hello world");
    }
    // Call onopen directly if socket is already open
    if (socket.readyState == WebSocket.OPEN) socket.onopen();



    //sends to consumers the text with attribute 'Text' the shit. JSON.stringify is useful here i guess
    $("#chatform").submit(function (event) {
        socket.send($("#chatform input").val());
        event.preventDefault();
    });

    // Hook up send button to send a message
    // roomdiv.find("form").on("submit", function () {
    //     socket.send(JSON.stringify({
    //         "command": "send",
    //         "room": data.join,
    //         "message": roomdiv.find("input").val()
    //     }));
    //     roomdiv.find("input").val("");
    //     return false;
    // });
    // $("#chats").append(roomdiv);
});
