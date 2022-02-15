namespace ToDo.Models
{
    public class Todo
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Day { get; set; }
        public bool Reminder { get; set; }
    }
}