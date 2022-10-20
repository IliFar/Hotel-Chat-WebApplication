using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using WebApiChatApplication.Models;

namespace WebApiChatApplication.Hubs
{
    public class Chathub : Hub
    {
        public async Task JoinRoom(UserConnection userConnection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Room);
            await Clients.Group(userConnection.Room).SendAsync("RecieveMessage", $"{userConnection.User} has joined {userConnection.Room}");
        }
    }
}
