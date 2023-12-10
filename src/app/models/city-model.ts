export type CityDetails = {
    administrativeArea: AdministrativeArea;
    country:            AdministrativeArea;
    key:                string;
    localizedName:      string;
    primaryPostalCode:  null;
}

export type AdministrativeArea = {
    englishName?:   null;
    id?:            string;
    localizedName?: string;
}
