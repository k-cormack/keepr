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
    public class VaultsController : Controller
    {
        VaultRepository _repo;
        public VaultsController(VaultRepository repo)
        {
            _repo = repo;
        }

        [HttpGet]
        public IEnumerable<Vault> Get()
        {
            return _repo.GetAll();
        }

        [HttpGet("{vaultId}")]
        public Vault GetVaultById(int vaultId)
        {
            return _repo.GetVaultById(vaultId);
        }
        [HttpGet("myvaults/{userId}")]
        public IEnumerable<Vault> GetMyVaults(string userId)
        {
            return _repo.GetMyVaults(userId);
        }

        [Authorize]
        [HttpPost]
        public Vault Post([FromBody] Vault vault)
        {
            vault.UserId = HttpContext.User.Identity.Name;
            if (ModelState.IsValid)
            {
                vault = new Vault(vault.Name, vault.Description, vault.UserId);
                return _repo.Create(vault);
            }
            throw new Exception("INVALID VAULT");
        }
        [HttpDelete("{id}")]
        public string DeleteVault(int Id)
        {
            return _repo.DeleteVault(Id);
            
        }

    }

}