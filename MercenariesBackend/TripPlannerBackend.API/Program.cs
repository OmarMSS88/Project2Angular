using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using MercenariesBackend.DAL;
using MercenariesBackend.DAL.Initializer;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAutoMapper(typeof(Program));
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");
builder.Services.AddDbContext<MercenariesDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddAuthentication().AddJwtBearer();

builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("OfferTypeDeleteAccess", policy =>
                          policy.RequireClaim("permissions", "delete:offertype"));
    options.AddPolicy("OfferTypeWriteAccess", policy =>
                          policy.RequireClaim("permissions", "add:offertype", "update:offertype"));
});


builder.Services.AddControllers();
builder.Services.AddSwaggerService();

var app = builder.Build();

app.UseCors(options =>
{
    options.AllowAnyHeader();
    options.AllowAnyMethod();
    options.AllowAnyOrigin();
    //options.WithOrigins("http://localhost:4200", "http://localhost:4200", "https://dev-omar.eu.auth0.com");
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var mercContext = scope.ServiceProvider.GetRequiredService<MercenariesDbContext>();
    mercContext.Database.EnsureDeleted(); // This will drop the database
    mercContext.Database.EnsureCreated(); // This will recreate the database
    DBInitializer.Initialize(mercContext);
}

app.Run();
