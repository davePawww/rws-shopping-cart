const validCodes = [
  {
    code: 'WHYAMIBUYINGTHIS',
    percentOff: 15,
  },
  {
    code: 'BROKEBUTSHOPPING',
    percentOff: 20,
  },
  {
    code: 'IMPOOR10',
    percentOff: 10,
  },
];

export const validateDiscountCode = (code: string) => {
  const existingCode = validCodes.find((item) => item.code === code);
  if (!existingCode) return 0;

  return existingCode.percentOff;
};
