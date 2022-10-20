using System.Collections.Generic;
using System.Linq;

namespace WebApiChatApplication.Models
{
    public class MockRoomRepository : IRoomRepository
    {
        private readonly IEnumerable<Room> rooms;
        private readonly List<Todo> todos;

        public MockRoomRepository()
        {
            todos = new List<Todo>()
            {
                new Todo { Title = "Bedding"},
                new Todo { Title = "Washing"},
                new Todo { Title = "Cleaning"},
                new Todo { Title = "Preparing"}
            };

            rooms = new List<Room>()
            {
                new Room
                {
                    Id = 1,
                    Name = "Conference Room 1",
                    Todo = todos,
                },
                new Room
                {
                    Id = 2,
                    Name = "Conference Room 2",
                    Todo = todos,
                },
                new Room
                {
                    Id = 3,
                    Name = "Conference Room 3",
                    Todo = todos,
                },
                new Room
                {
                    Id = 4,
                    Name = "Room 4",
                    Todo = todos,
                },
                new Room
                {
                    Id = 5,
                    Name ="Swimming Pool",
                    Todo = todos,
                }
            };

        }

        public IEnumerable<Room> GetAll()
        {
            return rooms.ToList();
        }
        public Room GetRoomById(int id)
        {
            return rooms.FirstOrDefault(r => r.Id == id);
        }
    }
}
