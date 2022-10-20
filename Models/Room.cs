using System.Collections.Generic;

namespace WebApiChatApplication.Models
{
    public class Room
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Todo> Todo { get; set; }
    }
}
