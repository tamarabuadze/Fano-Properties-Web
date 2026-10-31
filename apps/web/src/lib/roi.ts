// Buy-to-let ROI model for UAE (Dubai) residential property.
// All money values are AED; all rates are percentages (e.g. 4 = 4%).

export interface RoiInputs {
  price: number;
  sizeSqft: number;
  // Purchase costs
  dldFeePct: number;          // Dubai Land Department transfer fee
  agencyFeePct: number;       // buyer's agency commission (VAT added on top)
  otherCosts: number;         // trustee, title deed, valuation, NOC, etc.
  // Financing
  useMortgage: boolean;
  downPaymentPct: number;
  interestRatePct: number;
  loanTermYears: number;
  // Income & running costs
  annualRent: number;
  vacancyPct: number;
  serviceChargePerSqft: number;
  maintenancePct: number;     // of gross rent
  managementPct: number;      // of gross rent
  // Growth & exit
  appreciationPct: number;
  rentGrowthPct: number;
  holdYears: number;
  sellingCostPct: number;
}

export interface RoiYear {
  year: number;
  propertyValue: number;
  rent: number;
  cashFlow: number;
  cumulativeCashFlow: number;
  loanBalance: number;
  equity: number;
}

export interface RoiResult {
  loanAmount: number;
  downPayment: number;
  dldFee: number;
  agencyFee: number;
  mortgageRegistrationFee: number;
  totalPurchaseCosts: number;
  cashInvested: number;
  annualMortgagePayment: number;
  monthlyMortgagePayment: number;
  effectiveRent: number;
  annualServiceCharges: number;
  annualOperatingCosts: number;
  netOperatingIncome: number;
  annualCashFlow: number;
  monthlyCashFlow: number;
  grossYieldPct: number;
  netYieldPct: number;
  cashOnCashPct: number;
  saleValue: number;
  saleProceeds: number;
  totalProfit: number;
  totalRoiPct: number;
  annualisedRoiPct: number;
  years: RoiYear[];
}

export const VAT_PCT = 5;
// Dubai mortgage registration: 0.25% of the loan plus a fixed admin fee
export const MORTGAGE_REGISTRATION_PCT = 0.25;
export const MORTGAGE_REGISTRATION_ADMIN = 290;

export function defaultRoiInputs(price = 2_000_000, sizeSqft = 1_200): RoiInputs {
  return {
    price,
    sizeSqft,
    dldFeePct: 4,
    agencyFeePct: 2,
    otherCosts: 5_000,
    useMortgage: true,
    downPaymentPct: 20,
    interestRatePct: 4.5,
    loanTermYears: 25,
    annualRent: Math.round((price * 0.06) / 1_000) * 1_000,
    vacancyPct: 5,
    serviceChargePerSqft: 15,
    maintenancePct: 5,
    managementPct: 0,
    appreciationPct: 4,
    rentGrowthPct: 3,
    holdYears: 5,
    sellingCostPct: 2,
  };
}

const pct = (v: number) => v / 100;

/** Fixed monthly repayment for an amortising loan. */
export function monthlyPayment(principal: number, annualRatePct: number, termYears: number): number {
  const n = Math.round(termYears * 12);
  if (principal <= 0 || n <= 0) return 0;
  const r = pct(annualRatePct) / 12;
  if (r === 0) return principal / n;
  return (principal * r) / (1 - Math.pow(1 + r, -n));
}

/** Loan balance remaining after `months` repayments. */
export function remainingBalance(
  principal: number,
  annualRatePct: number,
  termYears: number,
  months: number
): number {
  const n = Math.round(termYears * 12);
  if (principal <= 0 || n <= 0) return 0;
  if (months >= n) return 0;
  const r = pct(annualRatePct) / 12;
  if (r === 0) return principal * (1 - months / n);
  const pmt = monthlyPayment(principal, annualRatePct, termYears);
  return principal * Math.pow(1 + r, months) - (pmt * (Math.pow(1 + r, months) - 1)) / r;
}

export function calculateRoi(i: RoiInputs): RoiResult {
  const price = Math.max(0, i.price);
  const holdYears = Math.max(1, Math.round(i.holdYears));

  const loanAmount = i.useMortgage ? price * (1 - pct(i.downPaymentPct)) : 0;
  const downPayment = price - loanAmount;

  const dldFee = price * pct(i.dldFeePct);
  const agencyFee = price * pct(i.agencyFeePct) * (1 + pct(VAT_PCT));
  const mortgageRegistrationFee =
    loanAmount > 0 ? loanAmount * pct(MORTGAGE_REGISTRATION_PCT) + MORTGAGE_REGISTRATION_ADMIN : 0;
  const totalPurchaseCosts = dldFee + agencyFee + mortgageRegistrationFee + Math.max(0, i.otherCosts);
  const cashInvested = downPayment + totalPurchaseCosts;

  const monthlyMortgagePayment = monthlyPayment(loanAmount, i.interestRatePct, i.loanTermYears);
  const annualMortgagePayment = monthlyMortgagePayment * 12;

  const annualServiceCharges = Math.max(0, i.sizeSqft) * Math.max(0, i.serviceChargePerSqft);

  // Year-one operating figures
  const yearOne = operatingYear(i.annualRent, i, annualServiceCharges);
  const annualCashFlow = yearOne.noi - annualMortgagePayment;

  const years: RoiYear[] = [];
  let cumulativeCashFlow = 0;
  for (let y = 1; y <= holdYears; y++) {
    const rent = i.annualRent * Math.pow(1 + pct(i.rentGrowthPct), y - 1);
    const op = operatingYear(rent, i, annualServiceCharges);
    const cashFlow = op.noi - annualMortgagePayment * yearsOfPaymentsIn(y, i.loanTermYears, loanAmount);
    cumulativeCashFlow += cashFlow;
    const propertyValue = price * Math.pow(1 + pct(i.appreciationPct), y);
    const loanBalance = remainingBalance(loanAmount, i.interestRatePct, i.loanTermYears, y * 12);
    years.push({
      year: y,
      propertyValue,
      rent,
      cashFlow,
      cumulativeCashFlow,
      loanBalance,
      equity: propertyValue - loanBalance,
    });
  }

  const last = years[years.length - 1]!;
  const saleValue = last.propertyValue;
  const saleProceeds = saleValue * (1 - pct(i.sellingCostPct)) - last.loanBalance;
  const totalProfit = saleProceeds + cumulativeCashFlow - cashInvested;
  const totalRoi = cashInvested > 0 ? totalProfit / cashInvested : 0;
  const annualisedRoi = totalRoi > -1 ? Math.pow(1 + totalRoi, 1 / holdYears) - 1 : -1;

  return {
    loanAmount,
    downPayment,
    dldFee,
    agencyFee,
    mortgageRegistrationFee,
    totalPurchaseCosts,
    cashInvested,
    annualMortgagePayment,
    monthlyMortgagePayment,
    effectiveRent: yearOne.effectiveRent,
    annualServiceCharges,
    annualOperatingCosts: yearOne.costs,
    netOperatingIncome: yearOne.noi,
    annualCashFlow,
    monthlyCashFlow: annualCashFlow / 12,
    grossYieldPct: price > 0 ? (i.annualRent / price) * 100 : 0,
    netYieldPct: price + totalPurchaseCosts > 0 ? (yearOne.noi / (price + totalPurchaseCosts)) * 100 : 0,
    cashOnCashPct: cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : 0,
    saleValue,
    saleProceeds,
    totalProfit,
    totalRoiPct: totalRoi * 100,
    annualisedRoiPct: annualisedRoi * 100,
    years,
  };
}

function operatingYear(grossRent: number, i: RoiInputs, serviceCharges: number) {
  const effectiveRent = grossRent * (1 - pct(i.vacancyPct));
  const costs = serviceCharges + grossRent * pct(i.maintenancePct) + grossRent * pct(i.managementPct);
  return { effectiveRent, costs, noi: effectiveRent - costs };
}

/** Fraction of year `y` during which mortgage payments are still due. */
function yearsOfPaymentsIn(y: number, termYears: number, loanAmount: number): number {
  if (loanAmount <= 0) return 0;
  return Math.min(1, Math.max(0, termYears - (y - 1)));
}
