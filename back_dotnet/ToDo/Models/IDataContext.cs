using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using ToDo.Models;

namespace ToDo.Models
{
    public interface IDataContext
    {
        DbSet<Todo> Todos { get; init; }
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
    }
}