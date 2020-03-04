import json
import requests
from flask import Flask, render_template

app = Flask(__name__)


def get_servers():
    with open('servers.json') as f:
        return json.load(f)


@app.route('/')
def index():
    discord = requests.get("https://discordapp.com/api/guilds/516135382191177728/widget.json")
    if discord.status_code == 429:
        discord = {"online": 555, "invite": "https://discord.gg/YFSp8qE"}
    else:
        discord = discord.json()
        online = discord["presence_count"]
        invite = discord["instant_invite"]
        discord = {"online": online, "invite": invite}
    servers = {}
    for cat in get_servers():
        servers[cat] = []
        for server in get_servers()[cat]:
            server_json = {"name": server["name"],
                           "status": "Down",
                           "ping": 0,
                           "ip": f"{server['ip']}:{server['port']}",
                           "players": 0,
                           "max_players": 30,
                           "version": 0}
            servers[cat].append(server_json)
    print(servers)
    return render_template('index.html', servers=servers, discord=discord)


# @app.route('/e')
# def e():
#     return render_template('elements.html')


if __name__ == '__main__':
    app.run()
