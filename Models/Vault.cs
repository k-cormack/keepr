using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace keepr.Models
{
    public class Vault
    {
        public int Id { get; set; }
        [Required]
        [MinLength(5)]
        public string Name { get; set; }

        public string Description { get; set; }
        
        public string UserId { get; set; }

        public Vault() { }

        public Vault(string name, string description, string userId)
        {
            Name = name;
            Description = description;
            UserId = userId;
        }


    }
}