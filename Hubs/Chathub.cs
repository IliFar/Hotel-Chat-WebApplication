using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using WebApiChatApplication.Models;

namespace WebApiChatApplication.Hubs
{
    public class Chathub : Hub
    {
        private readonly IDictionary<string, UserConnection> connections;

        public Chathub(IDictionary<string, UserConnection> connections)
        {
            this.connections = connections;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", $"{userConnection.User} has left the room");
            }

            return base.OnDisconnectedAsync(exception);
        }

        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            connections[Context.ConnectionId] = userConnection;

            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", $"{userConnection.User} has joined {userConnection.Room}");
        }
        public async Task SendMessage(string message)
        {
            if (connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, message);
            }
        }


    }
}
