using MistrzowieWynajmu.Models.Database;
using MistrzowieWynajmu.Models.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MistrzowieWynajmu.Models.Repositories
{
	public class AddressRepository : IAddressRepository
	{
		private readonly DatabaseContext _databaseContext;

		public AddressRepository(DatabaseContext databaseContext)
		{
			_databaseContext = databaseContext;
		}

		public int AddAddress(Address address)
		{
			if (address == null)
			{
				throw new Exception("Address object cannot be null.");
			}

			_databaseContext.Addresses.Add(address);
			_databaseContext.SaveChanges();
			return address.AddressId;
		}

		public Address GetAddress(int addressId)
		{
			if(addressId <= 0)
			{
				throw new Exception("Id cannot be less than 0.");
			}

			return _databaseContext.Addresses.FirstOrDefault(address => address.AddressId == addressId);
		}
	}
}
