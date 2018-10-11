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
        public Keep GetKeepById(int keepId)
        {
            return _repo.GetById(keepId);
        }

        [Authorize]
        [HttpPost]
        public Keep Post([FromBody] Keep keep)
        {
            if (ModelState.IsValid)
            {
                keep = new Keep(keep.Name, keep.Description, keep.Img);
                return _repo.Create(keep);
            }
            throw new Exception("INVALID KEEP");
        }

    }

}