#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDo.Models;
using Npgsql;
using System.Data;


namespace ToDo.Controllers
{
   // [Route("api/[controller]")]
    [Route("todoitems")]
    [ApiController]
    public class ToDoController : ControllerBase
    {
        private readonly TodoDb _context;

        //original string used for entity here only as reminder
       // string constr = "Host=db;Port=5432;Database=tododb;Username=postgres;Password=postgres;CommandTimeout=0;";

        public ToDoController(TodoDb context)
        {
            _context = context;
        }

        // GET: obavezno http /todoitems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
        {
            //ENTITY
           // return await _context.Todos.ToListAsync();
           
            //SQL MANUAL
            List<Todo> todos = new List<Todo>();
            string query = "SELECT * FROM \"Todos\"";

            Database.Instance.Connect();
            IDataReader dataReader = Database.Instance.GetDataReader(query);

            while (dataReader.Read())
            {
             
                int id = int.Parse(dataReader["Id"].ToString());
                string name = dataReader["Name"].ToString();
                string day = dataReader["Day"].ToString();
                bool reminder = Convert.ToBoolean(dataReader["Reminder"]);
                
                Todo todo = new Todo()
                {
                    Id = id,
                    Name = name,
                    Day = day,
                    Reminder = reminder
                };

                todos.Add(todo);
            }


            dataReader.Close();
            Database.Instance.Disconnect();

            return todos;
        }

        //Not filtering so not really using it
        [HttpGet("{id}")]
        public async Task<ActionResult<Todo>> GetTodo(int id)
        {
            var todo = await _context.Todos.FindAsync(id);

            if (todo == null)
            {
                return NotFound();
            }

            return todo;
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutTodo(int id, Todo todo)
        {
            if (id != todo.Id)
            {
                return BadRequest();
            }
            /*
            _context.Entry(todo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TodoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
            */

            Database.Instance.Connect();
            string query = $"UPDATE \"Todos\" " +
                $"SET \"Name\" = '{todo.Name}', \"Day\" = '{todo.Day}',\"Reminder\" = '{todo.Reminder}' " +
                $" WHERE \"Id\" = {id}";
            Database.Instance.ExecuteCommand(query);
            Database.Instance.Disconnect();
            
            return NoContent();
        }

        
        [HttpPost]
        public async Task<ActionResult<Todo>> PostTodo(Todo todo)
        {
            /*ENTITY
            _context.Todos.Add(todo);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodo", new { id = todo.Id }, todo);
            */

            //SQL Manual
            Database.Instance.Connect();

            string query = $"INSERT INTO \"Todos\"(\"Name\",\"Day\",\"Reminder\") " +
                $"VALUES('{todo.Name}','{todo.Day}','{todo.Reminder}')";

            Database.Instance.ExecuteCommand(query);

            Database.Instance.Disconnect();

            return CreatedAtAction("GetTodo", new { id = todo.Id }, todo);
            

        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            /* ENTITY
            var todo = await _context.Todos.FindAsync(id);
            if (todo == null)
            {
                return NotFound();
            }

            _context.Todos.Remove(todo);
            await _context.SaveChangesAsync();

            return NoContent();
            */

            //SQL Manula
            Database.Instance.Connect();
            string sql = $"DELETE FROM \"Todos\" WHERE \"Id\" = {id}";
            Database.Instance.ExecuteCommand(sql);
            Database.Instance.Disconnect();

            return NoContent();
            
        }

        private bool TodoExists(int id)
        {
            return _context.Todos.Any(e => e.Id == id);
        }
    }
}
