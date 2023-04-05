export const localCurrencyFormat = (amount: number): string => amount.toLocaleString('da-DK', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
