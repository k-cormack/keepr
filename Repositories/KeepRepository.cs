using System;
using System.Data;
using System.Linq;
using BCrypt.Net;
using keepr.Models;
using Dapper;
using System.Collections.Generic;

namespace keepr.Repositories
{
    public class KeepRepository
    {

        IDbConnection _db;
        public KeepRepository(IDbConnection db)
        {
            _db = db;
        }

        //CRUD via SQL

        //GET ALL KEEPS
        public IEnumerable<Keep> GetAll()
        {
            return _db.Query<Keep>("SELECT * FROM keeps;");
        }
        //GET KEEP BY ID
        public Keep GetById(int id)
        {
            return _db.Query<Keep>("SELECT * FROM keeps WHERE id = @Id;", new { id }).FirstOrDefault();
        }
        //CREATE KEEP
        public Keep Create(Keep keep)
        {
            int id = _db.ExecuteScalar<int>(@"
            INSERT INTO keeps (name, description, img)
            VALUES (@Name, @Description, @Img);
            SELECT LAST_INSERT_ID();", keep
            );
        keep.Id = id;
        return keep;
        }
        //UPDATE KEEP
        public Keep Update(Keep keep)
        {
            _db.Execute(@"
            UPDATE keeps SET (name, description, img)
            VALUES (@Name, @Description, @Img)
            WHERE id = @Id", keep);
            return keep;
        }
        //DELETE KEEP
        public Keep Delete(Keep keep)
        {
            _db.Execute("DELETE FROM keeps WHERE id = @Id", keep);
        return keep;
        }

        // public IEnumerable<Keep> GetKeepsByUserId(string id)
        // {
        //     return _db.Query<Keep>(@"
        //     SELECT * FROM keeps WHERE 
        //     ")
        // }

    }
}
        