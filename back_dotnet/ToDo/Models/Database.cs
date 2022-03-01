using Npgsql;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ToDo.Models;
using System.Data;

namespace ToDo.Models
{
    public class Database
    {
        private static Database instance;

        private static string connectionString = "Host=db;Port=5432;Database=tododb;Username=postgres;Password=postgres;";
        private static NpgsqlConnection Connection;
        public void Connect()
        {
            Connection = new NpgsqlConnection(connectionString);

            Connection.Open();
        }

        public void Disconnect()
        {
            if (Connection.State != ConnectionState.Closed)
            {
                Connection.Close();
            }
        }

        public static Database Instance
        {
            get
            {
                if (instance == null)
                {
                    instance = new Database();
                }
                return instance;
            }
        }

        public IDataReader GetDataReader(string query)
        {
            NpgsqlCommand command = new NpgsqlCommand(query, Connection);
            return command.ExecuteReader();
        }
        //Not using since no filtering
        public object GetValue(string query)
        {
            NpgsqlCommand command = new NpgsqlCommand(query, Connection);
            return command.ExecuteScalar();
        }

        public int ExecuteCommand(string query)
        {
            NpgsqlCommand command = new NpgsqlCommand(query, Connection);
            return command.ExecuteNonQuery();
        }


    
    }
}