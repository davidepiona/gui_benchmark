import configureWebSocket from './WSConnect';

export const subscribeWS = () => {
  return stomp.subscribe("/app/upload", function(message) {
        var quote = JSON.parse(message.body);
        console.log(quote.symbol + " is at " + quote.value+ "TTTTTTTTTTT");
      })
}


export const uploadWSMovie = (id, movie, partId, partCount) => {
  stomp.send("/app/upload", {}, JSON.stringify({id: id, fileContent: movie, partCount: partCount, partId: partId }));
}

// onmessage = function(e) {

//         try{
//             data = JSON.parse(e.data);
//         }catch(er){
//             console.log('socket parse error: '+e.data);
//         }
    
//         if (typeof(data['cmd_id']) != 'undefined' && typeof(socketQueue['i_'+data['cmd_id']]) == 'function'){
//             execFunc = socketQueue['i_'+data['cmd_id']];
//             execFunc(data['result']);
//             delete socketQueue['i_'+data['cmd_id']]; // to free up memory.. and it is IMPORTANT thanks  Le Droid for the reminder
//             return;
//         }else{
//             socketRecieveData(e.data);
//         }
//         }
// }

let stomp;
configureWebSocket({
        endpoint: "http://127.0.0.1:8020/events",
        onConnectedCallback: (ref) => {
                stomp = ref;
        },
        onDisconnectedCallback: () => {
                stomp = null;
        },
        logOnConsole: true,
        timeout: 5000
})

//endpoint, credentials, onConnectedCallback,onDisconnectedCallback, logOnConsole, timeout