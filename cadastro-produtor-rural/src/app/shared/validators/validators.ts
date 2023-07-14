export class Validators {
  static validateCPF(cpf: string): boolean {
    if (!cpf) {
      return false;
    }
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11) {
      return false;
    }

    let sum = 0;
    let remainder: number;

    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    }

    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(9, 10), 10)) {
      return false;
    }

    sum = 0;

    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
    }

    remainder = (sum * 10) % 11;

    if ((remainder === 10) || (remainder === 11)) {
      remainder = 0;
    }

    if (remainder !== parseInt(cpf.substring(10, 11), 10)) {
      return false;
    }

    return true;
  }

  static validateCNPJ(cnpj: string): boolean {
    if (!cnpj) {
      return false;
    }
    cnpj = cnpj.replace(/\D/g, ''); // Remover caracteres especiais

    if (cnpj.length !== 14) {
      return false;
    }

    // Validar dígitos verificadores
    const validateDigit = (digits: string): boolean => {
      const weights = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      const calculateDigit = (base: string): number => {
        const sum = base.split('').reduce((acc, digit, i) => {
          const weight = weights[i];
          return acc + (parseInt(digit, 10) * weight);
        }, 0);
        const remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
      };
      const base = digits.slice(0, -2);
      const expectedDigit1 = calculateDigit(base + digits[digits.length - 2]);
      const expectedDigit2 = calculateDigit(base + digits[digits.length - 2] + expectedDigit1.toString());
      return (
        digits[digits.length - 2] === expectedDigit1.toString() &&
        digits[digits.length - 1] === expectedDigit2.toString()
      );
    };

    if (!validateDigit(cnpj)) {
      return false;
    }

    return true;
  }
}
