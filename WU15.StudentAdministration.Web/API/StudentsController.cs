using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Web.Http;
using WU15.StudentAdministration.Web.Models;
using System.Security.Cryptography.X509Certificates;
using WU15.StudentAdministration.Web.DataAccess;
using System.Data.Entity;

namespace WU15.StudentAdministration.Web.API
{
    public class StudentsController : ApiController
    {

        private DefaultDataContext db = new DefaultDataContext();
        
        public IEnumerable<Student> Get()
        {
            var students = db.Students.Include("Courses").OrderBy(x => x.FirstName);
            
            
            return students;
        }

        public Student Get(int id)
        {
            return db.Students.FirstOrDefault(x => x.Id == id);
        }

        public string Post(Student student)
        {
            if (student.Id > 0)
            {
                

                    db.Entry(student).State = EntityState.Modified;

            } 
                else
                {
                    db.Students.Add(student);
                }


            db.SaveChanges();
            return string.Format("{0} {1}", student.FirstName, student.LastName);
        
        }

            
           
    
    
    }
           
    
}




//db.SaveChanges();
            //return string.Format("{0} {1}", student.FirstName, student.LastName, student.StudentPersNummer, student.Aktiv);
        
            
            
            //else
            //{
            //    var savedIndex = MvcApplication.Students.FindIndex(x => x.Id == student.Id);

            //    MvcApplication.Students.RemoveAt(savedIndex);
            //    student.Aktiv = true;
            //}



            //MvcApplication.Students.Add(student);


            //SmtpClient client = new SmtpClient();
            //client.Host = "mailserver";
            //client.Port = 21;
            //client.Credentials = new NetworkCredential("username", "password");

            //var toAddress = new MailAddress("???.asdad@kjlkj.se");

            //MailMessage mail = new MailMessage();
            //mail.Body = "Kaffet snart slut.";
            //mail.Subject = "Kaffe!";
            //mail.From = new MailAddress("tarek@?.??", "Tarek");
            //mail.To.Add(toAddress);

            //client.Send(mail);





            

        //[HttpDelete]
        //public void Delete(int id)
        //{
        //    var student = MvcApplication.Students.FirstOrDefault(x => x.Id == id);
        //    MvcApplication.Students.Remove(student);
        //}