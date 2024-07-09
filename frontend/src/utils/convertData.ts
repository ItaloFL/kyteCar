export function converterData(dataString: any): string {
  const dataOriginal = new Date(dataString);
  const ano = dataOriginal.getFullYear();
  const mes = String(dataOriginal.getMonth() + 1).padStart(2, "0");
  const dia = String(dataOriginal.getDate()).padStart(2, "0");
  return `${ano}-${mes}-${dia}`;
}
