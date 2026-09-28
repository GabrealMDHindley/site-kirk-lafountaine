"use client";

import { useMemo, useState } from "react";

type MortgageCalculatorProps = {
  homePrice: number;
  address?: string;
};

const currency = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function MortgageCalculator({ homePrice, address }: MortgageCalculatorProps) {
  const [price, setPrice] = useState(homePrice);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);
  const [taxRate, setTaxRate] = useState(1.1); // annual property tax %, CA typical ~1.1%
  const [annualInsurance, setAnnualInsurance] = useState(1400);
  const hoa = 0;

  const result = useMemo(() => {
    const downPayment = price * (downPct / 100);
    const loanAmount = Math.max(price - downPayment, 0);
    const monthlyRate = rate / 100 / 12;
    const numPayments = termYears * 12;

    const principalAndInterest =
      monthlyRate === 0
        ? loanAmount / numPayments
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
          (Math.pow(1 + monthlyRate, numPayments) - 1);

    const monthlyTax = (price * (taxRate / 100)) / 12;
    const monthlyInsurance = annualInsurance / 12;
    const totalMonthly = principalAndInterest + monthlyTax + monthlyInsurance + hoa;

    return {
      downPayment,
      loanAmount,
      principalAndInterest: Number.isFinite(principalAndInterest) ? principalAndInterest : 0,
      monthlyTax,
      monthlyInsurance,
      totalMonthly: Number.isFinite(totalMonthly) ? totalMonthly : 0,
    };
  }, [price, downPct, rate, termYears, taxRate, annualInsurance, hoa]);

  return (
    <div className="border border-gold-deep/40 bg-panel/60 rounded-lg p-6 md:p-8">
      <p className="text-xs uppercase tracking-widest text-gold mb-1">Affordability Estimate</p>
      <h3 className="font-display text-2xl md:text-3xl text-paper mb-6">
        {address ? `What ${address} could cost you` : "Estimate your monthly payment"}
      </h3>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-5">
          <Field label="Home Price" value={`$${price.toLocaleString()}`}>
            <input
              type="range"
              min={homePrice * 0.5}
              max={homePrice * 1.5}
              step={1000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-[#c9a24b]"
              aria-label="Home price"
            />
          </Field>

          <Field label="Down Payment" value={`${downPct}% (${currency(result.downPayment)})`}>
            <input
              type="range"
              min={0}
              max={100}
              step={1}
              value={downPct}
              onChange={(e) => setDownPct(Number(e.target.value))}
              className="w-full accent-[#c9a24b]"
              aria-label="Down payment percentage"
            />
          </Field>

          <Field label="Interest Rate" value={`${rate.toFixed(2)}%`}>
            <input
              type="range"
              min={2}
              max={10}
              step={0.05}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full accent-[#c9a24b]"
              aria-label="Interest rate"
            />
          </Field>

          <Field label="Loan Term" value={`${termYears} years`}>
            <div className="flex gap-2 mt-1">
              {[15, 20, 30].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTermYears(t)}
                  className={`px-4 py-1.5 text-sm border rounded-full transition-colors ${
                    termYears === t
                      ? "bg-gold text-ground border-gold"
                      : "border-gold-deep/50 text-paper/80 hover:border-gold"
                  }`}
                >
                  {t} yr
                </button>
              ))}
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Property Tax / yr" value={`${taxRate.toFixed(2)}%`}>
              <input
                type="range"
                min={0.5}
                max={2.5}
                step={0.05}
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
                className="w-full accent-[#c9a24b]"
                aria-label="Annual property tax percentage"
              />
            </Field>
            <Field label="Home Insurance / yr" value={currency(annualInsurance)}>
              <input
                type="range"
                min={400}
                max={4000}
                step={50}
                value={annualInsurance}
                onChange={(e) => setAnnualInsurance(Number(e.target.value))}
                className="w-full accent-[#c9a24b]"
                aria-label="Annual home insurance"
              />
            </Field>
          </div>
        </div>

        <div className="bg-ground/60 border border-gold-deep/30 rounded-lg p-6 flex flex-col justify-center">
          <p className="text-xs uppercase tracking-widest text-warm-gray mb-2">
            Estimated Monthly Payment
          </p>
          <p className="font-display text-5xl text-gold-bright mb-6 tabular-nums">
            {currency(result.totalMonthly)}
            <span className="text-lg text-warm-gray">/mo</span>
          </p>

          <dl className="space-y-2 text-sm">
            <Row label="Principal & Interest" value={currency(result.principalAndInterest)} />
            <Row label="Property Tax" value={currency(result.monthlyTax)} />
            <Row label="Home Insurance" value={currency(result.monthlyInsurance)} />
            {hoa > 0 && <Row label="HOA" value={currency(hoa)} />}
            <div className="gold-rule my-2" />
            <Row label="Loan Amount" value={currency(result.loanAmount)} />
            <Row label="Down Payment" value={currency(result.downPayment)} />
          </dl>

          <p className="text-[11px] text-warm-gray mt-6 leading-relaxed">
            Estimate only — actual rate, taxes, insurance and HOA vary. Talk to Kirk and a
            lender for an accurate pre-approval.
          </p>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-1">
        <label className="text-sm text-paper/80">{label}</label>
        <span className="text-sm text-gold-bright tabular-nums">{value}</span>
      </div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-paper/85">
      <dt className="text-warm-gray">{label}</dt>
      <dd className="tabular-nums">{value}</dd>
    </div>
  );
}
