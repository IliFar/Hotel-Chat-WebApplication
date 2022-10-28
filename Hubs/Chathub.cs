using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
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


        /* 
        Checks if there is a user in the connections dictionary and removes it from it. 
        After that it sends a message to the group that the user is disconnected from the group
        And calls the connectedUsers method
        */
        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", $"{userConnection.User} has left the room");

                ConnectedUsers(userConnection.Room);
            }

            return base.OnDisconnectedAsync(exception);
        }


        /* 
        Joins a user to a group (room) and sends a message to the group that the user has joined.
        calls the ConnectedUsers method to keep track of all the connected users.
        */
        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);

            connections[Context.ConnectionId] = userConnection;

            await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", $"{userConnection.User} has joined {userConnection.Room}");

            await ConnectedUsers(userConnection.Room);
        }

        /*
        Checks if there is a user value in the connections dictionary.
        And Sends message and the user to the chosen group (room) 
        */
        public async Task SendMessageToGroup(string message)
        {
            if (connections.TryGetValue(Context.ConnectionId, out UserConnection userConnection))
            {
                await Clients.Group(userConnection.Room).SendAsync("ReceiveMessage", userConnection.User, message);
            }
        }


        // Gets all connected users, save them in a varibale and send them to clients in the group (room)
        public Task ConnectedUsers(string room)
        {
            var users = connections.Values
                .Where(c => c.Room == room)
                .Select(c => c.User);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }


    }
}
