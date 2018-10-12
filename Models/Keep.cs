using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace keepr.Models
{
    public class Keep
    {
        public int Id { get; set; }
        [Required]
        [MinLength(3)]
        public string Name { get; set; }

        public string UserId { get; set; }

        public string Description { get; set; }
        [Required]
        public string Img { get; set; }

        public Keep() { }

        public Keep(string name, string description, string img, string userId)
        {
            Name = name;
            Description = description;
            Img = img;
            UserId = userId;
        }


    }
}