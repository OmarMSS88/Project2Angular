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

            CreateMap<Offer, OfferDto>();
            CreateMap<CreateOfferDto, Offer>();
            CreateMap<UpdateOfferDto, Offer>();

            CreateMap<User, UserDto>();
            CreateMap<CreateUserDto, User>();
            CreateMap<UpdateUserDto, User>();

            CreateMap<Booking, BookingDto>()
                .ForMember(dest => dest.Booker, opt => opt.MapFrom(src => src.Booker))
                .ForMember(dest => dest.Offer, opt => opt.MapFrom(src => src.Offer));

            CreateMap<CreateBookingDto, Booking>();
        }
    }
}
