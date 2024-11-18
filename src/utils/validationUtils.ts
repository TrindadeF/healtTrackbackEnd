export const isValidCPF = (cpf: string): boolean => {
  return cpf.length === 11 && /^\d+$/.test(cpf);
};
