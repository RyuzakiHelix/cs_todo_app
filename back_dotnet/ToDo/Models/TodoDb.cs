using Microsoft.EntityFrameworkCore;
using System.Diagnostics.CodeAnalysis;

namespace ToDo.Models
{
    public class TodoDb : DbContext, IDataContext
    {
        public TodoDb(DbContextOptions<TodoDb> options) : base(options) { }

        public DbSet<Todo> Todos { get; init; }
        // public DbSet<Todo> Todos{ get; set; }

        //public DbSet<Todo> Todos{ get; set; } = null!;
        // public DbSet<Todo> Todos => Set<Todo>();
    }
}