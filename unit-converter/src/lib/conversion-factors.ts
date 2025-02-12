type ConversionFunction = (value: number) => number;

type ConversionFactors = {
  [key: string]: {
    [key: string]: number | ConversionFunction;
  };
};

export const conversionFactors: ConversionFactors = {
  // Length conversions
  length: {
    meters_to_feet: 3.28084,
    feet_to_meters: 0.3048,
    kilometers_to_miles: 0.621371,
    miles_to_kilometers: 1.60934,
    centimeters_to_inches: 0.393701,
    inches_to_centimeters: 2.54,
    meters_to_yards: 1.09361,
    yards_to_meters: 0.9144,
  },

  // Weight conversions
  weight: {
    kilograms_to_pounds: 2.20462,
    pounds_to_kilograms: 0.453592,
    grams_to_ounces: 0.035274,
    ounces_to_grams: 28.3495,
    metric_tons_to_pounds: 2204.62,
    pounds_to_metric_tons: 0.000453592,
  },

  // Temperature conversions
  temperature: {
    celsius_to_fahrenheit: (c: number) => (c * 9/5) + 32,
    fahrenheit_to_celsius: (f: number) => (f - 32) * 5/9,
    celsius_to_kelvin: (c: number) => c + 273.15,
    kelvin_to_celsius: (k: number) => k - 273.15,
    fahrenheit_to_kelvin: (f: number) => ((f - 32) * 5/9) + 273.15,
    kelvin_to_fahrenheit: (k: number) => ((k - 273.15) * 9/5) + 32,
  },

  // Speed conversions
  speed: {
    kph_to_mph: 0.621371,
    mph_to_kph: 1.60934,
    mps_to_kph: 3.6,
    kph_to_mps: 0.277778,
    knots_to_mph: 1.15078,
    mph_to_knots: 0.868976,
  },

  // Volume conversions
  volume: {
    liters_to_gallons: 0.264172,
    gallons_to_liters: 3.78541,
    milliliters_to_ounces: 0.033814,
    ounces_to_milliliters: 29.5735,
    cubic_meters_to_cubic_feet: 35.3147,
    cubic_feet_to_cubic_meters: 0.0283168,
  },

  // Area conversions
  area: {
    square_meters_to_square_feet: 10.7639,
    square_feet_to_square_meters: 0.092903,
    hectares_to_acres: 2.47105,
    acres_to_hectares: 0.404686,
    square_kilometers_to_square_miles: 0.386102,
    square_miles_to_square_kilometers: 2.58999,
  },

  // Pressure conversions
  pressure: {
    pascal_to_bar: 0.00001,
    bar_to_pascal: 100000,
    psi_to_pascal: 6894.76,
    pascal_to_psi: 0.000145038,
    bar_to_psi: 14.5038,
    psi_to_bar: 0.0689476,
  },

  // Energy conversions
  energy: {
    joules_to_kilowatt_hours: 2.77778e-7,
    kilowatt_hours_to_joules: 3.6e+6,
    calories_to_joules: 4.184,
    joules_to_calories: 0.239006,
    btu_to_joules: 1055.06,
    joules_to_btu: 0.000947817,
  },

  // Power conversions
  power: {
    watts_to_horsepower: 0.00134102,
    horsepower_to_watts: 745.7,
    kilowatts_to_horsepower: 1.34102,
    horsepower_to_kilowatts: 0.7457,
  },

  // Data storage conversions
  data_storage: {
    bytes_to_kilobytes: 0.001,
    kilobytes_to_bytes: 1024,
    megabytes_to_gigabytes: 0.001,
    gigabytes_to_megabytes: 1024,
    terabytes_to_gigabytes: 1024,
    gigabytes_to_terabytes: 0.000976563,
  },

  // Data transfer rate conversions
  data_transfer: {
    kbps_to_mbps: 0.001,
    mbps_to_kbps: 1000,
    mbps_to_gbps: 0.001,
    gbps_to_mbps: 1000,
  },

  // Time conversions
  time: {
    seconds_to_minutes: 0.0166667,
    minutes_to_seconds: 60,
    hours_to_minutes: 60,
    minutes_to_hours: 0.0166667,
    days_to_hours: 24,
    hours_to_days: 0.0416667,
  },

  // Angle conversions
  angle: {
    degrees_to_radians: 0.0174533,
    radians_to_degrees: 57.2958,
    degrees_to_gradians: 1.11111,
    gradians_to_degrees: 0.9,
  },

  // Fuel efficiency conversions
  fuel_efficiency: {
    mpg_to_kmpl: 0.425144,
    kmpl_to_mpg: 2.35215,
    mpg_to_lper100km: (mpg: number) => 235.215 / mpg,
    lper100km_to_mpg: (lper100km: number) => 235.215 / lper100km,
  },

  // Density conversions
  density: {
    kg_per_cubic_meter_to_g_per_cubic_centimeter: 0.001,
    g_per_cubic_centimeter_to_kg_per_cubic_meter: 1000,
    pounds_per_cubic_foot_to_kg_per_cubic_meter: 16.0185,
    kg_per_cubic_meter_to_pounds_per_cubic_foot: 0.0624279,
  },

  // Torque conversions
  torque: {
    newton_meter_to_pound_foot: 0.737562,
    pound_foot_to_newton_meter: 1.35582,
    newton_meter_to_pound_inch: 8.85074,
    pound_inch_to_newton_meter: 0.112985,
  },

  // Force conversions
  force: {
    newton_to_dyne: 100000,
    dyne_to_newton: 0.00001,
    newton_to_pound_force: 0.224809,
    pound_force_to_newton: 4.44822,
  },

  // Voltage conversions
  voltage: {
    volt_to_millivolt: 1000,
    millivolt_to_volt: 0.001,
    volt_to_kilovolt: 0.001,
    kilovolt_to_volt: 1000,
  },

  // Current conversions
  current: {
    ampere_to_milliampere: 1000,
    milliampere_to_ampere: 0.001,
    ampere_to_kiloampere: 0.001,
    kiloampere_to_ampere: 1000,
  },

  // Resistance conversions
  resistance: {
    ohm_to_kiloohm: 0.001,
    kiloohm_to_ohm: 1000,
    ohm_to_megaohm: 0.000001,
    megaohm_to_ohm: 1000000,
  },

  // Capacitance conversions
  capacitance: {
    farad_to_microfarad: 1000000,
    microfarad_to_farad: 0.000001,
    farad_to_picofarad: 1000000000000,
    picofarad_to_farad: 0.000000000001,
  },

  // Inductance conversions
  inductance: {
    henry_to_millihenry: 1000,
    millihenry_to_henry: 0.001,
    henry_to_microhenry: 1000000,
    microhenry_to_henry: 0.000001,
  },

  // Cooking conversions
  cooking: {
    cup_to_gram: (cup: number) => cup * 236.588,
    gram_to_cup: (gram: number) => gram / 236.588,
    tablespoon_to_milliliter: 14.7868,
    milliliter_to_tablespoon: 0.067628,
  },
}; 