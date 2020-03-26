$(document).ready(() => {

    const socket = io.connect(`https://api.sigmadraconis.games/wss`);

    const get_status = (data) => {
        if (data.status === "Down"){
            return 'negative'
        }
        else if (data.players === data.max_players){
            return 'active'
        }
        else if (data.ping >= 200.00){
            return 'intermediary'
        }
        else if (data.status === "ok"){
            return 'positive'
        }
        else {
            return 'negative'
        }

    };

    socket.on('server_update', msg => {
        let {server} = msg;
        console.log(server.name.split(" ")[0]);
        $(`#${server.name.replace(/\s+/g, '')}`).html(`<b>${server.name}: ${server.ip} </b><br><b><status-indicator ${get_status(server)} pulse></status-indicator> Status:  </b> <b>  Ping</b>: ${server.ping} <a href="steam://connect/${server.ip}" class="button primary small fit icon solid fa-user">${server.players}/${server.max_players} Join!</a>`)
    });

     socket.on('scores_update', msg => {
          let {scores} = msg;
         console.log(scores)});

     socket.on('online_update', msg => {
         console.log(msg);
      $(`#${msg.id_key}`).html(`<b>Total Online: ${msg.count}</b>`)

     });
});
