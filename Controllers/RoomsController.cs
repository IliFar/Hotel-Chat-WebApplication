using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApiChatApplication.Models;

namespace WebApiChatApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly IRoomRepository roomRepository;

        public RoomsController(IRoomRepository roomRepository)
        {
            this.roomRepository = roomRepository;
        }

        // GET: api/<RoomController>
        [HttpGet]
        public IActionResult Get()
        {
            var roomList = roomRepository.GetAll();

            return Ok(roomList);
        }

        // GET api/<RoomController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var room = roomRepository.GetRoomById(id);
            return Ok(room);
        }
    }
}
