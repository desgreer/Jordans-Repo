//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ScrumDevelopmentServices
{
    using System;
    using System.Collections.Generic;
    
    public partial class SprintUser
    {
        public string userEmail { get; set; }
        public int sprintId { get; set; }
        public string roleName { get; set; }
        public int projectId { get; set; }
        public int sprintUserId { get; set; }
    
        public virtual ProjectUser ProjectUser { get; set; }
        public virtual Sprint Sprint { get; set; }
    }
}