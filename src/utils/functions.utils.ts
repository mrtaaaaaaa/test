type ParmeterType = {
  number: number;
  setter: (parameter: string | number) => void;
};

export function convertToCurrencySuffix(
  number: ParmeterType["number"],
  setter: ParmeterType["setter"]
) {
  const units = ["", "هزار", "میلیون", "میلیارد", "تریلیون", "کوادریلیون"];
  const unit = Math.floor((number.toString().length - 1) / 3);
  const suffix = (units[unit] || "") + " تومان";

  if (unit === 0) {
    setter("تومان");
  } else {
    setter(suffix);
  }
}

export function convertNumberToWords(
  number: ParmeterType["number"],
  setter: ParmeterType["setter"]
) {
  function tooman(number: string): string {
    let m = parseInt(number);
    m = Math.round(m % 1000);
    if (m > 0 && m < 1000) {
      let result = m.toString();
      return result;
    }
    return "";
  }
  function hezar(number: string): string {
    let m = parseInt(number);
    m = Math.floor(m / 1000);
    m = Math.round(m % 1000);
    if (m > 0 && m < 1000000) {
      let result = m.toString() + " هزار و ";
      return result;
    } else {
      return "";
    }
  }
  function million(number: string): string {
    let m = parseInt(number);
    m = Math.floor(m / 1000000);
    m = Math.round(m % 1000);
    if (m > 0) {
      let result = m.toString() + " میلیون و ";
      return result;
    } else {
      return "";
    }
  }
  function milyard(number: string): string {
    let m = parseInt(number);
    m = Math.floor(m / 1000000000);
    m = Math.round(m % 1000);
    if (m > 0) {
      let result = m.toString() + " میلیارد و ";
      return result;
    } else {
      return "";
    }
  }
  function trillion(number: string): string {
    let m = parseInt(number);
    m = Math.floor(m / 1000000000000);
    m = Math.round(m % 1000);
    if (m > 0) {
      let result = m.toString() + " تریلیون و ";
      return result;
    } else {
      return "";
    }
  }
  function quadrillion(number: string): string {
    let m = parseInt(number);
    m = Math.floor(m / 1000000000000000);
    m = Math.round(m % 1000);
    if (m > 0) {
      let result = m.toString() + " کوادریلیون و ";
      return result;
    } else {
      return "";
    }
  }
  if (number > 0) {
    setter(
      quadrillion(`${number}`) +
        trillion(`${number}`) +
        milyard(`${number}`) +
        million(`${number}`) +
        hezar(`${number}`) +
        tooman(`${number}`) +
        " تومان "
    );
  } else {
    setter("");
  }
}
