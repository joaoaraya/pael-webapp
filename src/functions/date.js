export function getDate() {
    // Obter a data atual
    const dataAtual = new Date();

    // Obter o dia do mês (1-31)
    const diaAtual = dataAtual.getDate();

    // Obter o nome do mês atual
    const meses = [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'
    ];
    const mesAtual = meses[dataAtual.getMonth()];

    // Obter o ano atual
    const anoAtual = dataAtual.getFullYear();

    return {
        dia: diaAtual,
        mes: mesAtual,
        ano: anoAtual
    };
}