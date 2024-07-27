using AutoMapper;
using MercenariesBackend.API.Dto;
using MercenariesBackend.DAL.Entity;

namespace MercenariesBackend.API.Mapper
{
    public class AutoMapper : Profile
    {
        public AutoMapper()
        {

            CreateMap<OfferType, OfferTypeDto>();
            CreateMap<CreateOfferTypeDto, OfferType>();
            CreateMap<UpdateOfferTypeDto, OfferType>();

        }
    }
}
