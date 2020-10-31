using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using Data;

namespace OnionWebAPI.Controllers
{
    public class UsersController : ApiController
    {
        private AzuredbEntities db = new AzuredbEntities();

        // GET: api/Users
        public IQueryable<User> GetUsers()
        {
            return db.Users;
        }

        // GET: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(string name)
        {
            User user = db.Users.Where(x => (x.Name == name)).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        //GET: api/users/name and password

        [ResponseType(typeof(User))]
        public IHttpActionResult GetUserLogin(string name, string password)
        {
            User user = db.Users.Where(x => (x.Name == name && x.Password == password)).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        //GET: api/users/name or email 
        [ResponseType(typeof(User))]
        public IHttpActionResult GetUserExist(string name, string email)
        {
            User user = db.Users.Where(x => (x.Name == name || x.Email == email)).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }


        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(string name, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //if (id != user.Id)
            //{
            //    return BadRequest();
            //}

            //db.Entry(user).State = EntityState.Modified;
            var target = db.Users.Where(x => (x.Name == name)).FirstOrDefault();
            if (target == null)
            {
                return NotFound();
            }

            target.Name = user.Name;
            target.Password = user.Password;
            target.Email = user.Email;
          


            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
                //if (!UserExists(name))
                //{
                //    return NotFound();
                //}
                //else
                //{
                //    throw;
                //}
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Users
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Users.Add(user);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { name = user.Name }, user);
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(string name)
        {
            User user = db.Users.Where(x => (x.Name == name)).FirstOrDefault();
            if (user == null)
            {
                return NotFound();
            }

            db.Users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(int id)
        {
            return db.Users.Count(e => e.Id == id) > 0;
        }
    }
}