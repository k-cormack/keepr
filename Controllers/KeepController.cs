using System;
using System.Collections.Generic;
using keepr.Models;
using keepr.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace keepr.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KeepsController : Controller
    {
        KeepRepository _repo;
        public KeepsController(KeepRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IEnumerable<Keep> Get()
        {
            return _repo.GetAll();
        }

        [HttpGet("{keepId}")]
        public Keep GetKeepsById(int keepId)
        {
            return _repo.GetById(keepId);
        }
        
        //api/keep/vaultkeeps/someid
        [HttpGet("vaultkeeps/{vaultId}")]
        public IEnumerable<Keep> GetKeepsByVaultId(int vaultId) 
        {
            return _repo.GetKeepsByVaultId(vaultId);
        }

        [Authorize]
        [HttpPost]
        public Keep Post([FromBody] Keep keep)
        {
            keep.UserId = HttpContext.User.Identity.Name;
            if (ModelState.IsValid)
            {
                keep = new Keep(keep.Name, keep.Description, keep.Img, keep.UserId);
                return _repo.Create(keep);
            }
            throw new Exception("INVALID KEEP");
        }

        [HttpPost("vaultkeeps")]
        public string AddVaultKeep([FromBody]VaultKeep vaultKeep)
        {
            vaultKeep.UserId = HttpContext.User.Identity.Name;
            return _repo.AddVaultKeep(vaultKeep);
        }
        [HttpDelete("vaultkeeps")]
        public string DeleteVaultKeep([FromBody]VaultKeep vaultKeep)
        {
            vaultKeep.UserId = HttpContext.User.Identity.Name;
            return _repo.DeleteVaultKeep(vaultKeep);
        }

    }

}