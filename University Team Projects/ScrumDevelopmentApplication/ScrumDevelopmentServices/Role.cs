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
    
    public partial class Role
    {
        public Role()
        {
            this.ProjectUsers = new HashSet<ProjectUser>();
        }
    
        public string name { get; set; }
    
        public virtual ICollection<ProjectUser> ProjectUsers { get; set; }
    }
}
