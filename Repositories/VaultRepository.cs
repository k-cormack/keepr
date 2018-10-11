using System;
using System.Data;
using System.Linq;
using BCrypt.Net;
using keepr.Models;
using Dapper;
using System.Collections.Generic;

namespace keepr.Repositories
{
    public class VaultRepository
    {

        IDbConnection _db;
        public VaultRepository(IDbConnection db)
        {
            _db = db;
        }

        //CRUD via SQL

        //GET ALL VAULTS
        public IEnumerable<Vault> GetAll()
        {
            return _db.Query<Vault>("SELECT * FROM vaults;");
        }
        //GET VAULT BY ID
        public Vault GetById(int id)
        {
            return _db.Query<Vault>("SELECT * FROM vaults WHERE id = @Id;", new { id }).FirstOrDefault();
        }
        //CREATE VAULT
        public Vault Create(Vault vault)
        {
            int id = _db.ExecuteScalar<int>(@"
            INSERT INTO vaults (name, description, userId)
            VALUES (@Name, @Description, @UserId);
            SELECT LAST_INSERT_ID();", vault
            );
        vault.Id = id;
        return vault;
        }
        //UPDATE VAULT
        public Vault Update(Vault vault)
        {
            _db.Execute(@"
            UPDATE vaults SET (name, description)
            VALUES (@Name, @Description)
            WHERE id = @Id", vault);
            return vault;
        }
        //DELETE VAULT
        public Vault Delete(Vault vault)
        {
            _db.Execute("DELETE FROM vaults WHERE id = @Id", vault);
        return vault;
        }

        // public IEnumerable<Vault> GetVaultsByUserId(string id)
        // {
        //     return _db.Query<Vault>(@"
        //     SELECT * FROM vaults WHERE 
        //     ")
        // }

    }
}
        