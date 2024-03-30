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

export function getDateISO() {
    const dataAtual = new Date();

    const diaAtual = dataAtual.getDate().toString().padStart(2, '0');
    const mesAtual = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const anoAtual = dataAtual.getFullYear();

    return `${anoAtual}-${mesAtual}-${diaAtual}`;
}

export function validateDate(date) {
    // Expressão regular para verificar o formato YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;

    // Verificar se a data corresponde ao formato esperado
    if (!regex.test(date)) {
        return false;
    }

    // Extrair os componentes da data
    const parts = date.split('-');
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);

    // Verificar se o mês está entre 1 e 12
    if (month < 1 || month > 12) {
        return false;
    }

    // Verificar se o dia é válido para o mês
    const lastDayOfMonth = new Date(year, month, 0).getDate();
    if (day < 1 || day > lastDayOfMonth) {
        return false;
    }

    // Se passou por todas as verificações, a data é válida
    return true;
}

export function getDateBrasilia() {
    // Obtém a data e hora atuais em UTC
    let dataAtualUTC = new Date();

    // Ajusta para o horário de Brasília (UTC-3)
    let fusoHorarioBrasilia = -3 * 60; // Horário de Brasília é UTC-3
    dataAtualUTC.setMinutes(dataAtualUTC.getMinutes() + fusoHorarioBrasilia);

    // Retorna a data ajustada para o horário de Brasília
    return dataAtualUTC;
}