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
            INSERT INTO keeps (name, description, img, userId)
            VALUES (@Name, @Description, @Img, @UserId);
            SELECT LAST_INSERT_ID();", keep
            );
            keep.Id = id;
            return keep;
        }
        // CREATE VAULTKEEPS ENTRY
        public string AddVaultKeep(VaultKeep vaultKeep)
        {
            int success = _db.Execute(@"
            INSERT INTO vaultkeeps (vaultId, keepId, userId)
            VALUES (@VaultId, @KeepId, @UserId)
            ", vaultKeep);
            if(success == 1){
            return "created vaultkeep";
            }
            return "Failed";
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
            _db.Execute("DELETE FROM keeps WHERE id = @Id", new{keep});
            return keep;
        }
        //GET KEEPS BY VAULT ID
        public IEnumerable<Keep> GetKeepsByVaultId(int vaultId)
        {
            return _db.Query<Keep>(@"
            SELECT * FROM vaultkeeps vk
            INNER JOIN keeps k ON k.id = vk.keepId 
            WHERE (vaultId = @vaultId)  
            ", new {vaultId});
        }
        //DELETE KEEP BY VAULT ID
        public string DeleteVaultKeep(VaultKeep vaultKeep)
        {
            int success = _db.Execute(@"
            DELETE FROM vaultkeeps
            WHERE vaultId = @vaultId
            AND keepId = @keepId
            ", vaultKeep);
            if(success == 1){
            return "Keep Deleted from Vault";
            }
            return "Delete Failed";
        }

    }
}
