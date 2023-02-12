/**
 * Calcula a integral de uma função em um determinado intervalo.
 * 
 * Este código implementa a Regra do Ponto Médio para aproximar a integral de uma função.
 * 
 * @param func A função a ser integrada.
 * @param start O ponto de início do intervalo.
 * @param end O ponto final do intervalo.
 * @param numSegments O número de segmentos usados para aproximar a curva.
 * 
 * @returns A aproximação da integral da função no intervalo fornecido.
 */
export function approximateIntegral(func: (x: number) => number, start: number, end: number, numSegments: number): number {
  let integralApproximation = 0;
  const stepSize = (end - start) / numSegments;
  
  for (let i = 1; i < numSegments; i++) {
    integralApproximation += func(start + i * stepSize);
  }
  
  integralApproximation = stepSize * (integralApproximation + (func(start) + func(end)) / 2);
  return integralApproximation;
}