using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace keepr.Models
{
    public class VaultKeep
    {
        public int Id { get; set; }
        
        public string VaultId { get; set; }

        public int KeepId { get; set; }
        
        public string UserId { get; set; }

        public VaultKeep() { }

        public VaultKeep(string vaultId, int keepId, string userId)
        {
            VaultId = vaultId;
            KeepId = keepId;
            UserId = userId;
        }


    }
}