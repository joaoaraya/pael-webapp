function capitalize(text: string) {
    return text.toLowerCase().replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
}

function formatDate(dateText: string) {
    const date = new Date(dateText);
    const hour = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const day = date.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: 'numeric' });

    return `${day} ${hour}`;
}

function formatCPF(cpfText: string) {
    // Exemplo. De: "52464318833" para: "524.643.188-33"
    return cpfText.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function formatPhoneNumber(phoneNumber: string) {
    // Exemplo. De: "11996231243" para: "(11) 99623-1243"
    const ddd = phoneNumber.slice(0, 2);
    const group1 = phoneNumber.slice(2, 7);
    const group2 = phoneNumber.slice(7, 11);

    return `(${ddd}) ${group1}-${group2}`;
};

export { capitalize, formatDate, formatCPF, formatPhoneNumber }