using System.Collections.Generic;

namespace WebApiChatApplication.Models
{
    public interface IRoomRepository
    {
        IEnumerable<Room> GetAll();
        Room GetRoomById(int id);
    }
}
