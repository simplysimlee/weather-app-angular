export type CURRENT_WEATHER = {
    count: number;
    data:  Datum[];
}

export type Datum = {
    app_temp:      number;
    aqi:          number;
    city_name:     string;
    clouds:       number;
    country_code:  string;
    datetime:     string;
    dewpt:        number;
    dhi:          number;
    dni:          number;
    elev_angle:    number;
    ghi:          number;
    gust:         number;
    h_angle:       number;
    lat:          number;
    lon:          number;
    ob_time:       string;
    pod:          string;
    precip:       number;
    pres:         number;
    rh:           number;
    slp:          number;
    snow:         number;
    solarRAD:     number;
    sources:      string[];
    stateCode:    string;
    station:      string;
    sunrise:      string;
    sunset:       string;
    temp:         number;
    timezone:     string;
    ts:           number;
    uv:           number;
    vis:          number;
    weather:      Weather;
    wind_cdir:     string;
    wind_cdir_full: string;
    wind_dir:      number;
    wind_spd:      number;
}

export type Weather = {
    icon:        string;
    description: string;
    code:        number;
}
