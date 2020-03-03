using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Pims.Dal.Entities;
using Pims.Dal.Helpers.Extensions;

namespace Pims.Dal.Services.Admin
{
    /// <summary>
    /// BuildingPredominateUseService class, provides a service layer to administrate building predominate uses within the datasource.
    /// </summary>
    public class BuildingPredominateUseService : BaseService<BuildingPredominateUse>, IBuildingPredominateUseService
    {
        #region Variables
        #endregion

        #region Constructors
        /// <summary>
        /// Creates a new instance of a BuildingPredominateUseService, and initializes it with the specified arguments.
        /// </summary>
        /// <param name="dbContext"></param>
        /// <param name="user"></param>
        /// <param name="logger"></param>
        public BuildingPredominateUseService(PimsContext dbContext, ClaimsPrincipal user, ILogger<BuildingPredominateUseService> logger) : base(dbContext, user, logger) { }
        #endregion

        #region Methods
        /// <summary>
        /// Get a page of building predominate uses from the datasource.
        /// </summary>
        /// <param name="page"></param>
        /// <param name="quantity"></param>
        /// <param name="sort"></param>
        /// <returns></returns>
        public IEnumerable<BuildingPredominateUse> GetAllNoTracking()
        {
            var query = this.Context.BuildingPredominateUses.AsNoTracking();
            return query.OrderBy(p => p.Name).ToArray();
        }

        /// <summary>
        /// /// Get all building predominate uses from the datasource.
        /// </summary>
        /// <returns></returns>
        public IEnumerable<BuildingPredominateUse> GetAll()
        {
            return this.Context.BuildingPredominateUses.OrderBy(p => p.Name).ToArray();
        }

        /// <summary>
        /// Updates the specified building predominate use in the datasource.
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public override BuildingPredominateUse Update(BuildingPredominateUse entity)
        {
            entity.ThrowIfNull(nameof(entity));

            var buildingPredominateUse = this.Context.BuildingPredominateUses.Find(entity.Id);
            if (buildingPredominateUse == null) throw new KeyNotFoundException();

            this.Context.Entry(buildingPredominateUse).CurrentValues.SetValues(entity);
            return base.Update(buildingPredominateUse);
        }

        /// <summary>
        /// Remove the specified building predominate use from the datasource.
        /// </summary>
        /// <param name="entity"></param>
        public override void Remove(BuildingPredominateUse entity)
        {
            entity.ThrowIfNull(nameof(entity));

            var buildingPredominateUse = this.Context.BuildingPredominateUses.Find(entity.Id);
            if (buildingPredominateUse == null) throw new KeyNotFoundException();

            this.Context.Entry(buildingPredominateUse).CurrentValues.SetValues(entity);
            base.Remove(buildingPredominateUse);
        }
        #endregion
    }
}
