using Microsoft.EntityFrameworkCore;
using System.Web.Http.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.DependencyInjection;
using ToDo.Models;
using Microsoft.AspNetCore.Builder;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;



var builder = WebApplication.CreateBuilder(args);
ConfigurationManager configuration = builder.Configuration;


//builder.Services.AddDbContext<TodoDb>(opt => opt.UseInMemoryDatabase("TodoList"));
//builder.Services.AddDbContext<TodoDb>(opt => opt.UseNpgsql(Configuration.GetConnectionString("TodoDB")));

builder.Services.AddDbContext<TodoDb>(opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("TodoDB")));
builder.Services.AddScoped<IDataContext>(provider => provider.GetService<TodoDb>());

builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddControllers();

//builder.Services.AddDefaultIdentity<User>(options => options.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<UserContext>();
builder.Services.AddDbContext<UserContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("TodoDB")));
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<UserContext>()
    .AddDefaultTokenProviders();

// Adding Authentication google
builder.Services.AddAuthentication().AddGoogle("google", opt =>
    {
        var googleAuth = configuration.GetSection("Authentication:Google");
        opt.ClientId = googleAuth["ClientId"];
        opt.ClientSecret = googleAuth["ClientSecret"];
        opt.SignInScheme = IdentityConstants.ExternalScheme;
    });

// Adding Authentication jwt
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
})

// Adding Jwt Bearer
.AddJwtBearer(options =>
{
    options.SaveToken = true;
    options.RequireHttpsMetadata = false;
    options.TokenValidationParameters = new TokenValidationParameters()
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = configuration["JWT:ValidAudience"],
        ValidIssuer = configuration["JWT:ValidIssuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:securityKey"]))
    };
});
//builder.Services.AddIdentity<User, IdentityRole>().AddEntityFrameworkStores<UserContext>();
//builder.Services.AddDefaultIdentity<User>().AddEntityFrameworkStores<UserContext>();
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
app.UseAuthentication();
app.UseAuthorization();

app.UseCors("CORS");

app.MapGet("/", () => "Works1");

app.MapControllers();

//DATABASE MIGRATION TESTING, ONLY IF NOT EXISTS...

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var context = services.GetRequiredService<UserContext>();
    if (context.Database.GetPendingMigrations().Any())
    {
        context.Database.Migrate();
    }
}

app.Run();
