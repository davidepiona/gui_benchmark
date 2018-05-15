import configureWebSocket from './WSConnect';

export const subscribeWS = (refresh) => {
  var subscribe = stomp.subscribe("/topic/upload", function(message) {
        var quote = JSON.parse(message.body);
        if(quote){
                console.log("The upload is finished")
                subscribe.unsubscribe();
                refresh();
        }
      })
      return subscribe;
}


export const uploadWSMovie = (id, movie, partId, partCount) => {
  stomp.send("/app/upload", {}, JSON.stringify({id: id, fileContent: movie, partCount: partCount, partId: partId }));
}


let stomp;
configureWebSocket({
        endpoint: "http://127.0.0.1:8020/events",
        onConnectedCallback: (ref) => {
                stomp = ref;
        },
        onDisconnectedCallback: () => {
                stomp = null;
        },
        logOnConsole: false,
        timeout: 5000
})

//endpoint, credentials, onConnectedCallback,onDisconnectedCallback, logOnConsole, timeout