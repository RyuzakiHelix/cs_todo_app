using Microsoft.EntityFrameworkCore;
using System.Web.Http.Cors;
using ToDo.Models;
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("TodoList"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddControllers();
//dotnet watch run

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: "CORS",
                      builder =>
                      {
                          builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
                      });
});

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors("CORS");


app.MapControllers();

app.Run();
