export function capitalize(text: string) {
    return text.toLowerCase().replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
}


export function formatDate(dateText: string) {
    const date = new Date(dateText);
    const hour = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const day = date.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });

    return `${day} ${hour}`;
}

export function formatDateISOToBR(dateText: string) {
    // Divide a data em ano, mês e dia usando a função split()
    const partesData = dateText.split('-');

    // Obtém o ano, mês e dia
    const ano = partesData[0];
    const mes = partesData[1];
    const dia = partesData[2];

    // Formata a data no formato BR (dd/mm/aaaa)
    return `${dia}/${mes}/${ano}`;
}


export function formatDateToISO(dateText: string) {
    // Divide a data em dia, mês e ano usando a função split()
    const partesData = dateText.split('/');

    // Obtém o dia, mês e ano
    const dia = partesData[0];
    const mes = partesData[1];
    const ano = partesData[2];

    // Formata a data no formato ISO (aaaa-mm-dd)
    return `${ano}-${mes}-${dia}`;
}


export function formatCPF(cpfText: string) {
    // Exemplo. De: "52464318833" para: "524.643.188-33"
    return cpfText.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}


export function formatPhoneNumber(phoneNumber: string) {
    // Exemplo. De: "11996231243" para: "(11) 99623-1243"
    const ddd = phoneNumber.slice(0, 2);
    const group1 = phoneNumber.slice(2, 7);
    const group2 = phoneNumber.slice(7, 11);

    return `(${ddd}) ${group1}-${group2}`;
}