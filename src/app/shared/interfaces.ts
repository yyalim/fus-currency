export interface IDailyRatesResponse {
  rates: { [key: string]: number },
  base: string,
  date: string
}

export interface ILatestRates {
  symbol: string;
  currentRate: number;
  oldRate: number;
  diff: number;
  diffPercentage: number;
}

export interface IAvailableRate {
  label: string,
  value: string
}
