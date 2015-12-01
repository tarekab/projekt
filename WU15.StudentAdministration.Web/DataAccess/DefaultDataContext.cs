﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using WU15.StudentAdministration.Web.Models;
using Newtonsoft.Json;
using System.Data.Entity;

namespace WU15.StudentAdministration.Web.DataAccess
{
    public class DefaultDataContext : DbContext 
    {
        public DbSet<Student> Students { get; set; }
        
        public DbSet<Course> Courses {get;set;}

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
 	 base.OnModelCreating(modelBuilder);
        }

      
    
    }
}